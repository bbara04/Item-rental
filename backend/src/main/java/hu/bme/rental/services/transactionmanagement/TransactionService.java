package hu.bme.rental.services.transactionmanagement;

import hu.bme.rental.api.model.*;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.TransactionMapper;
import hu.bme.rental.persistence.models.AppUser;
import hu.bme.rental.persistence.models.RentingTransaction;
import hu.bme.rental.persistence.repositories.ItemRepository;
import hu.bme.rental.persistence.repositories.TransactionRepository;
import hu.bme.rental.persistence.repositories.UserRepository;
import hu.bme.rental.services.itemmanagement.ItemService;
import hu.bme.rental.services.usermanagement.UserManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    private final UserManagementService userManagementService;
    private final ItemService itemService;

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    private final JsonLogger jsonLogger;

    public TransactionResponse createTransactionFromUser(String userId, TransactionRequest transactionDetails) {
        if (!userId.equals(transactionDetails.getUserId()))
            return null;
        Optional<AppUser> persistenceUser = userRepository.findById(transactionDetails.getUserId());
        Optional<hu.bme.rental.persistence.models.Item> persistenceItem = itemRepository.findById(transactionDetails.getItemId());
        if (persistenceItem.isEmpty() || persistenceUser.isEmpty())
            return null;

        if (persistenceUser.get().getFaculty() != null && persistenceItem.get().getFaculties() != null) {
             boolean facultyMatches = persistenceItem.get().getFaculties().stream()
                    .anyMatch(faculty -> faculty.getId().equals(persistenceUser.get().getFaculty().getId()));
            if (!facultyMatches) {
                log.error("User faculty does not match any of the item's faculties");
                jsonLogger.logAsJson("User: ", persistenceUser.get());
                jsonLogger.logAsJson("Item: ", persistenceItem.get());
                return null;
            }
        }

        RentingTransaction rentingTransaction = new RentingTransaction();
        rentingTransaction.setRentedItem(persistenceItem.get());
        rentingTransaction.setRenterAppUser(persistenceUser.get());

        transactionMapper.toEntity(transactionDetails, rentingTransaction);

        if (
                rentingTransaction.getStatus().equals(TransactionStatus.DECLINED.getValue())
            &&   rentingTransaction.getRemainingDays().equals(0)
        ) {
            log.warn("Bad end date");
        } else if (
                rentingTransaction.getStatus().equals(TransactionStatus.DECLINED.getValue())
            &&   !rentingTransaction.getRemainingDays().equals(0)
        ) {
            log.warn("Not enough number of item for renting");
        } else {
            Integer numOfItem = rentingTransaction.getNumberOfItems();
            Integer avail = rentingTransaction.getRentedItem().getAvailability();
            rentingTransaction.getRentedItem().setAvailability(
                     avail - numOfItem
            );
            itemRepository.save(rentingTransaction.getRentedItem());
        }
        transactionRepository.saveAndFlush(rentingTransaction);
        jsonLogger.logAsJson("Mentett tranzakcio:", rentingTransaction);
        return transactionMapper.toApiDto(rentingTransaction);
    }

    public List<TransactionResponse> getAllTransactionsByUserId(String userId){
        List<RentingTransaction> persTransactions = transactionRepository.findAllByRenterAppUser_Id(Long.parseLong(userId));
        if (persTransactions.isEmpty())
            return null;
        List<TransactionResponse> apiTransactions = transactionMapper.toApiDtoList(persTransactions);

        log.info("User id: {}", userId);
        for (TransactionResponse apiTrans : apiTransactions)
            jsonLogger.logAsJson("User's transactions", apiTrans);
        return apiTransactions;
    }

    public TransactionResponse getTransactionById(String transactionId) {
        Optional<RentingTransaction> presTransaction = transactionRepository.findById(transactionId);
        return presTransaction.map(transactionMapper::toApiDto).orElse(null);
    }

    public TransactionResponse updateTransactionStatusById(String transactionId, TransactionStatusPatch postTransaction) {
        Optional<RentingTransaction> presTransaction = transactionRepository.findById(transactionId);
        if (presTransaction.isEmpty())
            return null;
        presTransaction.get().setStatus(postTransaction.getStatus().getValue());
        transactionRepository.saveAndFlush(presTransaction.get());
        return transactionMapper.toApiDto(presTransaction.get());
    }
}
