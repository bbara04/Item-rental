package hu.bme.rental.mappers;


import hu.bme.rental.api.model.TransactionRequest;
import hu.bme.rental.api.model.TransactionResponse;
import hu.bme.rental.api.model.TransactionStatus;
import hu.bme.rental.persistence.models.RentingTransaction;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {
                UserMapper.class,
                ItemMapper.class,
                FacultyMapper.class
        }
)
public interface TransactionMapper {

    /**
     * Maps a persistence model to an API model
     * @param transactionEntity Persistence model transaction
     * @return API model transaction response
     */
    @Named("toApiDto")
    @Mapping(source = "rentedItem", target = "item", qualifiedByName = "toApiDto")
    @Mapping(source = "renterAppUser", target = "user", qualifiedByName = "toApiDto")
    @Mapping(source = "id", target = "id")
    @Mapping(source = "transactionType", target = "transactionType")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "startDateTime", target = "startDate")
    @Mapping(source = "endDateTime", target = "endDate")
    @Mapping(source = "costPerDay", target = "costPerDay")
    @Mapping(source = "curCost", target = "currentCost")
    @Mapping(source = "numberOfItems", target = "numberOfItems")
    TransactionResponse toApiDto(RentingTransaction transactionEntity);

    @AfterMapping
    default void toApiDtoAfter(RentingTransaction transactionEntity, @MappingTarget TransactionResponse target) {
        if (transactionEntity.getEndDateTime().isBefore(LocalDateTime.now())
            && !transactionEntity.getStatus().equals(TransactionStatus.DECLINED.getValue())
        ) {
            target.setStatus(TransactionStatus.OVERDUE);
        }
    }


    /**
     * Maps a list of persistence model transactions to API model transactions
     * @param transactions List of persistence model transactions
     * @return List of API model transactions
     */
    @IterableMapping(elementTargetType = TransactionResponse.class, qualifiedByName = "toApiDto")
    List<TransactionResponse> toApiDtoList(List<RentingTransaction> transactions);


    /**
     * Creates a new RentingTransaction entity from a TransactionRequest
     * @param transactionRequest The transaction request with input data
     * @param transactionEntity The target transactionEntity
     * @return A new RentingTransaction entity
     */

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "rentedItem", ignore = true)
    @Mapping(target = "renterAppUser", ignore = true)
    @Mapping(target = "transactionType", constant = "RENTAL")
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "startDateTime", source = "startDate")
    @Mapping(target = "endDateTime", source = "endDate")
    @Mapping(target = "costPerDay", ignore = true)
    @Mapping(target = "curCost", constant = "0.0f")
    @Mapping(target = "numberOfItems", source = "numberOfItems")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    RentingTransaction toEntity(TransactionRequest transactionRequest, @MappingTarget RentingTransaction transactionEntity);

    @AfterMapping
    default void toEntityAfter(TransactionRequest transactionRequest, @MappingTarget RentingTransaction target) {
        target.setStatus(TransactionStatus.STARTED.getValue());

        LocalDateTime now = LocalDateTime.now();

        if (target.getRentedItem().getAvailability() < transactionRequest.getNumberOfItems()) {
            target.setStatus(TransactionStatus.DECLINED.getValue());
        }

        if (target.getEndDateTime().isBefore(now)) {
            target.setRemainingDays(0);
            target.setStatus(TransactionStatus.DECLINED.getValue());
        } else {
            long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(now, target.getEndDateTime());
            target.setRemainingDays(Math.toIntExact(daysBetween));
        }
        target.setCostPerDay(target.getRentedItem().getCostPerDay());
    }

}
