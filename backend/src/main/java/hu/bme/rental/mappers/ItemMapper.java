package hu.bme.rental.mappers;

import hu.bme.rental.api.model.Item;
import hu.bme.rental.api.model.ItemRequest;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {
                ItemCategoryMapper.class,
                FacultyMapper.class
        }
)
public interface ItemMapper {

    @Named("toApiDto")
    @Mapping(source = "categories", target = "categories", qualifiedByName = "toApiStringList")
    @Mapping(source = "faculties", target = "facultiesId", qualifiedByName = "toFacultyStringList")
    Item toApiDto(hu.bme.rental.persistence.models.Item persItem);

//    @Named("toEntity")
//    @Mapping(source = "categories", target = "categories", qualifiedByName = "toEntityList")
//    hu.bme.rental.persistence.models.Item toEntity(Item apiItem);

    /**
     * Maps a list of persistence model items to API model items
     * @param persItems List of persistence model items
     * @return List of API model items
     */
    @IterableMapping(elementTargetType = Item.class, qualifiedByName = "toApiDto")
    List<Item> toApiDtoList(List<hu.bme.rental.persistence.models.Item> persItems);

    /**
     * Updates an existing Item entity with data from ItemRequest
     * @param itemRequest The source ItemRequest with updated fields
     * @param item The target Item entity to update
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "faculties", ignore = true)
    @Mapping(target = "image", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateItemEntityFromApiRequest(ItemRequest itemRequest, @MappingTarget hu.bme.rental.persistence.models.Item item);

}
