package hu.bme.rental.mappers;

import hu.bme.rental.api.model.ItemCategory;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface ItemCategoryMapper {

    @Named("toStringApi")
    default String toStringApi(hu.bme.rental.persistence.models.ItemCategory persItemCategory) {
        return persItemCategory.getName();
    };


//    @Named("toEntity")
//    @Mapping(source = "university", target = "university", qualifiedByName = "toEntity")
//    hu.bme.rental.persistence.models.ItemCategory toEntity(ItemCategory apiItemCategory);

    /**
     * Maps a list of persistence model items to API model item categories
     * @param persItemCategories Set of persistence model item categories
     * @return List of API model item categories
     */
    @Named("toApiStringList")
    @IterableMapping(elementTargetType = String.class, qualifiedByName = "toStringApi")
    List<String> toApiStringList(Set<hu.bme.rental.persistence.models.ItemCategory> persItemCategories);

    @Named("IsRoot")
    default Boolean IsRoot(hu.bme.rental.persistence.models.ItemCategory parent){
        return parent == null ? Boolean.TRUE : Boolean.FALSE;
    }

    @Named("toApiDto")
    @Mapping(target = "parentCategory", source = "parentCategory", qualifiedByName = "convertParentCategory")
    @Mapping(source = "parentCategory", target = "isRoot", qualifiedByName = "IsRoot")
    ItemCategory toApiDto(hu.bme.rental.persistence.models.ItemCategory itemCategory);

    @Named("convertParentCategory")
    default ItemCategory convertParentCategory(hu.bme.rental.persistence.models.ItemCategory parent) {
        if (parent == null) {
            return null;
        }

        ItemCategory result = new ItemCategory();
        result.setId(parent.getId());
        result.setName(parent.getName());
        result.setDescription(parent.getDescription());
        result.setIsRoot(parent.getParentCategory() == null ? Boolean.TRUE : Boolean.FALSE);
        //parentCategory null, no f rec

        return result;
    }

    @Named("toApiDtoList")
    @IterableMapping(elementTargetType = ItemCategory.class, qualifiedByName = "toApiDto")
    List<ItemCategory> toApiDtoList(List<hu.bme.rental.persistence.models.ItemCategory> itemCategories);

}