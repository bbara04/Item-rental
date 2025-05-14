package hu.bme.rental.services.itemmanagement;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import hu.bme.rental.mappers.ItemCategoryMapperImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hu.bme.rental.api.model.Item;
import hu.bme.rental.api.model.ItemRequest;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.ItemMapper;
import hu.bme.rental.persistence.models.Faculty;
import hu.bme.rental.persistence.models.ItemCategory;
import hu.bme.rental.persistence.models.RentingTransaction;
import hu.bme.rental.persistence.repositories.FacultyRepository;
import hu.bme.rental.persistence.repositories.ImageRepository; // Added
import hu.bme.rental.persistence.repositories.ItemCategoryRepository;
import hu.bme.rental.persistence.repositories.ItemRepository;
import hu.bme.rental.persistence.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    private final ItemCategoryRepository itemCategoryRepository;
    private final ItemCategoryMapperImpl itemCategoryMapper;

    private final FacultyRepository facultyRepository;
    private final TransactionRepository transactionRepository;
    private final JsonLogger jsonLogger;
    private final ImageRepository imageRepository; // Added

    /**
     * Gets all item in the system
     * @return List of all Item
     */
    @Transactional
    public List<Item> getAllItems() {
        List<hu.bme.rental.persistence.models.Item> persistItems = itemRepository.findAll();
        for (hu.bme.rental.persistence.models.Item persistItem : persistItems) {
            jsonLogger.logAsJson("Item's details", persistItem);
        }
        return itemMapper.toApiDtoList(persistItems);
    }

    @Transactional
    public boolean deleteItemById(String id) {
        try {
            List<RentingTransaction> transactions = transactionRepository.findAllByRentedItem_Id(Long.parseLong(id));
            for (RentingTransaction transaction : transactions) {
                transaction.setRentedItem(null);
                transactionRepository.save(transaction);
            }

            if (itemRepository.existsById(id)) {
                itemRepository.deleteById(id);
                log.info("Successfully deleted item with id: {}", id);
                return true;
            }
            log.warn("There is no item with this id: {}", id);
            return false;
        }
        catch (Exception e){
            log.error("There is an error with deleting this id's item: {}", id, e);
            return false;
        }
    }

    @Transactional
    public List<Item> getItemsByCategory(String categoryId) {
        try {
            Optional<ItemCategory> optCategory = itemCategoryRepository.findById(categoryId);
            if (optCategory.isPresent()) {
                jsonLogger.logAsJson("Found category:", optCategory.get());
                List<hu.bme.rental.persistence.models.Item> presItems = itemRepository.findAllByCategoriesContains(Set.of(optCategory.get()));
                for (hu.bme.rental.persistence.models.Item item : presItems)
                    jsonLogger.logAsJson("Found persistence item:", item);
                List<Item> apiItems = presItems.stream().map(itemMapper::toApiDto).toList();
                return apiItems;
            }
            log.warn("There is no category with this id: {}", categoryId);
            return null;
        } catch (Exception e) {
            log.error("There was an error with categoryId: {}", categoryId, e);
            return null;
        }
    }

    public Item getItemById(String id) {
        Optional<hu.bme.rental.persistence.models.Item> presItem = itemRepository.findById(id);
        if (presItem.isPresent()) {
            jsonLogger.logAsJson("Found item by id:", presItem.get());
            return itemMapper.toApiDto(presItem.get());
        }
        return null;
    }

    /**
     * Updates an item based on the provided item request
     * @param id ID of the item to update
     * @param itemRequest Request containing the updated values
     * @return Updated item or null if item not found
     */
    @Transactional
    public Item updateItemById(String id, ItemRequest itemRequest) {
        try {
            Optional<hu.bme.rental.persistence.models.Item> optItem = itemRepository.findById(id);

            if (optItem.isPresent()) {
                hu.bme.rental.persistence.models.Item persistItem = optItem.get();

                // Alap mezők frissítése
                itemMapper.updateItemEntityFromApiRequest(itemRequest, persistItem);

                // Kategóriák frissítése, ha érkeztek
                if (itemRequest.getCategories() != null) {
                    // Új kategória lista létrehozása
                    Set<ItemCategory> newCategories = new HashSet<>();

                    for (String categoryName : itemRequest.getCategories()) {
                        ItemCategory foundCategory = itemCategoryRepository.findByName(categoryName);
                        if (foundCategory != null) {
                            newCategories.add(foundCategory);
                        } else {
                            log.warn("Category not found with name: {}", categoryName);
                        }
                    }

                    // Kategóriák teljes cseréje - a kapcsolótábla megfelelően frissül
                    for (ItemCategory presItemCat : newCategories)
                        log.info("New Category: {}", presItemCat);
                    persistItem.setCategories(newCategories);
                }

                // Fakultások frissítése, ha érkeztek
                if (itemRequest.getFacultiesId() != null) {
                    // Új fakultás lista létrehozása
                    Set<Faculty> newFaculties = new HashSet<>();

                    for (String facultyId : itemRequest.getFacultiesId()) {
                        Optional<Faculty> foundFaculty = facultyRepository.findById(facultyId);
                        if (foundFaculty.isPresent()) {
                            newFaculties.add(foundFaculty.get());
                        } else {
                            log.warn("Faculty not found with id: {}", facultyId);
                        }
                    }

                    // Fakultások teljes cseréje - a kapcsolótábla megfelelően frissül
                    for (Faculty presFaculty : newFaculties)
                        log.info("New Faculty: {}",presFaculty);
                    persistItem.setFaculties(newFaculties);
                }

                // Image frissítése, ha érkezett
                if (itemRequest.getImage() != null) {
                    hu.bme.rental.api.model.Image apiImage = itemRequest.getImage();
                    hu.bme.rental.persistence.models.Image imageToPersist = null;

                    // Prioritize new image data if provided
                    if (apiImage.getImageData() != null && apiImage.getImageData().length > 0) {
                        imageToPersist = persistItem.getImage() != null ? persistItem.getImage() : new hu.bme.rental.persistence.models.Image();
                        try {
                            // Assuming apiImage.getImageData() already contains the raw binary bytes,
                            // as Jackson likely decoded the Base64 string from the request.
                            byte[] imageDataBytes = apiImage.getImageData(); 
                            imageToPersist.setImageData(imageDataBytes);
                            imageToPersist.setContentType(apiImage.getContentType());
                            imageToPersist.setFileName(apiImage.getFileName());
                            imageToPersist.setEntityType("item");
                            try {
                                imageToPersist.setEntityId(persistItem.getId());
                            } catch (NumberFormatException e) {
                                log.warn("Item ID {} (String) could not be parsed to Long for Image.entityId (Long). Image entityId might not be set correctly.", persistItem.getId(), e);
                            }
                            imageRepository.save(imageToPersist);
                            persistItem.setImage(imageToPersist);
                            log.info("Item's image updated with new data. Image ID: {}", imageToPersist.getId());
                        } catch (IllegalArgumentException e) {
                            log.error("Failed to decode base64 image data for item id: {}. Image not updated.", id, e);
                        }
                    }
                    // Else, if ID is provided, try to link to an existing image
                    else if (apiImage.getId() != null) {
                        Optional<hu.bme.rental.persistence.models.Image> optExistingImage = imageRepository.findById(String.valueOf(apiImage.getId()));
                        if (optExistingImage.isPresent()) {
                            imageToPersist = optExistingImage.get();
                            imageToPersist.setEntityType("item");
                            try {
                                imageToPersist.setEntityId(persistItem.getId());
                            } catch (NumberFormatException e) {
                                log.warn("Item ID {} (String) could not be parsed to Long for Image.entityId (Long) when linking existing image. EntityId may not be updated correctly.", persistItem.getId(), e);
                            }
                            imageRepository.save(imageToPersist); 
                            persistItem.setImage(imageToPersist);
                            log.info("Item {} linked to existing image_id: {}", id, imageToPersist.getId());
                        } else {
                            log.warn("Image_id: {} provided in request for item id: {}, but no such image found. Image not changed.", apiImage.getId(), id);
                        }
                    }
                    // Else, if image object is "empty" (no data, no id), consider it a request to remove
                    else if (apiImage.getId() == null && (apiImage.getImageData() == null || apiImage.getImageData().length == 0) && apiImage.getFileName() == null && apiImage.getContentType() == null) {
                        if (persistItem.getImage() != null) {
                            log.info("Request to remove image from item id: {}. Current image id: {}", id, persistItem.getImage().getId());
                            persistItem.setImage(null); // Unlink
                            // Optionally, delete the old image from imageRepository if it's not shared and exclusively owned by the item.
                            // e.g., imageRepository.delete(oldImage); // Be cautious with this.
                            log.info("Image unlinked from item id: {}", id);
                        } else {
                            log.info("Request to remove image for item id: {}, but no image was associated.", id);
                        }
                    } else {
                        log.warn("ItemRequest for item id: {} contained an Image object with insufficient data to update or link, and not a clear removal request. Image not changed.", id);
                    }
                }
                

                // Entitás mentése
                hu.bme.rental.persistence.models.Item savedItem = itemRepository.save(persistItem);
                log.info("Item updated with id: {}", id);
                jsonLogger.logAsJson("Updated item:", savedItem);

                // Visszaadás API modellként
                return itemMapper.toApiDto(savedItem);
            }

            log.warn("No item found with id: {}", id);
            return null;
        } catch (Exception e) {
            log.error("Error updating item with id: {}", id, e);
            return null;
        }

    }


    public List<hu.bme.rental.api.model.ItemCategory> getAllItemCategories(){
        List<ItemCategory> persItemCategories = itemCategoryRepository.findAll();
        return itemCategoryMapper.toApiDtoList(persItemCategories);
    }


}
