package hu.bme.rental.mappers;

import hu.bme.rental.api.model.Faculty;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {
                UniversityMapper.class
        }
)
public interface FacultyMapper {

    @Named("toApiDto")
    @Mapping(source = "university", target = "university", qualifiedByName = "toApiDto")
    Faculty toApiDto(hu.bme.rental.persistence.models.Faculty persFacility);

    @Named("toEntity")
    @Mapping(source = "university", target = "university", qualifiedByName = "toEntity")
    hu.bme.rental.persistence.models.Faculty toEntity(Faculty apiFacility);
}
