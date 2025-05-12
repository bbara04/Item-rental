package hu.bme.rental.mappers;

import hu.bme.rental.api.model.University;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface UniversityMapper {

    @Named("toApiDto")
    University toApiDto (hu.bme.rental.persistence.models.University persUniversity);

    @Named("toEntity")
    @Mapping(target = "uniCode", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    hu.bme.rental.persistence.models.University toEntity (University apiUniversity);

    @Named("toEntity")
    @Mapping(target = "uniCode", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    hu.bme.rental.persistence.models.University toEntity (University apiUniversity, @MappingTarget hu.bme.rental.persistence.models.University targetUniversity);
}
