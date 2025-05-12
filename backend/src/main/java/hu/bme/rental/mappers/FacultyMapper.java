package hu.bme.rental.mappers;

import hu.bme.rental.api.model.Faculty;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

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

    /**
     * Maps a Faculty entity to its id as a String
     */
    @Named("toFacultyString")
    default String mapToString(hu.bme.rental.persistence.models.Faculty persFaculty) {
        return persFaculty.getId().toString();
    }

    /**
     * Maps a collection of Faculty entities to a list of strings (faculty names)
     */
    @IterableMapping(elementTargetType = String.class, qualifiedByName = "toFacultyString")
    @Named("toFacultyStringList")
    List<String> mapToStringList(Set<hu.bme.rental.persistence.models.Faculty> persFaculties);


    @Named("toApiDtoList")
    @IterableMapping(elementTargetType = Faculty.class, qualifiedByName = "toApiDto")
    List<Faculty> toApiDtoList(Set<hu.bme.rental.persistence.models.Faculty> persFacilities);


    @Named("toEntity")
    @Mapping(source = "university", target = "university", qualifiedByName = "toEntity")
    hu.bme.rental.persistence.models.Faculty toEntity(Faculty apiFacility);

    @Named("toEntity")
    @Mapping(source = "university", target = "university", qualifiedByName = "toEntity")
    hu.bme.rental.persistence.models.Faculty toEntity(Faculty apiFacility, @MappingTarget hu.bme.rental.persistence.models.Faculty targetFaculty);


}
