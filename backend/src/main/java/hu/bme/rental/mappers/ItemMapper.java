package hu.bme.rental.mappers;

import hu.bme.rental.api.model.Item;
import hu.bme.rental.persistence.models.ItemCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {
                ItemCategoryMapper.class
        }
)
public interface ItemMapper {

//    @Named("toApiDto")
//    @Mapping(source = "categories", target = "categories", qualifiedByName = "toApiDtoList")
//    @Mapping(target = "categories", ignore = true)
//    Item toApiDto(hu.bme.rental.persistence.models.Item persItem);

//    @Named("toEntity")
//    @Mapping(source = "categories", target = "categories", qualifiedByName = "toEntityList")
//    hu.bme.rental.persistence.models.Item toEntity(Item apiItem);

    /**
     * Maps a list of persistence model items to API model items
     * @param persItems List of persistence model items
     * @return List of API model items
     */
   // List<Item> toApiDtoList(List<hu.bme.rental.persistence.models.Item> persItems);
}
