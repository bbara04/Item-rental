package hu.bme.rental.mappers;


import hu.bme.rental.api.model.Balance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface BalanceMapper {

    @Named("toApiDto")
    @Mapping(source = "curValue", target = "currentValue")
    @Mapping(target = "userID", ignore = true)
    Balance toApiDto(hu.bme.rental.persistence.models.Balance balance);

    @Named("toEntity")
    @Mapping(source = "currentValue", target = "curValue")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    hu.bme.rental.persistence.models.Balance toEntity(Balance balance);

}
