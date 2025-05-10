package hu.bme.rental.mappers;

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
    @Named("toApiDtoList")
    @IterableMapping(elementTargetType = String.class, qualifiedByName = "toStringApi")
    List<String> toApiDtoList(Set<hu.bme.rental.persistence.models.ItemCategory> persItemCategories);
}