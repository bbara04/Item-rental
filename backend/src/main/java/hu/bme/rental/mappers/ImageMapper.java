package hu.bme.rental.mappers;

import hu.bme.rental.api.model.User;
import hu.bme.rental.persistence.models.AppUser;
import hu.bme.rental.persistence.models.Image;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface ImageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Image toEntity(hu.bme.rental.api.model.Image image, @MappingTarget Image targetImage);

}
