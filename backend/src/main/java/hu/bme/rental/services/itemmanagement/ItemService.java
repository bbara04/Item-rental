package hu.bme.rental.services.itemmanagement;

import hu.bme.rental.api.model.Item;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.ItemMapper;
import hu.bme.rental.persistence.models.AppUser;
import hu.bme.rental.persistence.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    private final JsonLogger jsonLogger;

    /**
     * Gets all item in the system
     * @return List of all Item
     */
    @Transactional
    public List<Item> getAllItems() {
        List<hu.bme.rental.persistence.models.Item> persistItems = itemRepository.findAll();
        for (hu.bme.rental.persistence.models.Item persistItem : persistItems) {
            jsonLogger.logAsJson("User details", persistItem);
        }
        return null; //itemMapper.toApiDtoList(persistItems);
    }
}
