package hu.bme.rental.controllers;

import hu.bme.rental.api.model.*;
import hu.bme.rental.api.rest.TransactionManagementApi;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.services.transactionmanagement.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TransactionController implements TransactionManagementApi {

    private final TransactionService transactionService;

    private final JsonLogger jsonLogger;

    @Override
    public ResponseEntity<TransactionResponse> createUserTransaction(String id, TransactionRequest postTransaction) {
        TransactionResponse response = transactionService.createTransactionFromUser(id, postTransaction);
        return response == null ?
            ResponseEntity.internalServerError().build()
            : ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Void> deleteUserTransaction(String id, String transactionId) {
        return null;
    }

    @Override
    public ResponseEntity<List<TransactionResponse>> getAllUserTransactions() {
        List<TransactionResponse> responses = transactionService.getAllTransaction();
        return responses == null ?
                ResponseEntity.internalServerError().build()
                : ResponseEntity.ok(responses);
    }

    public ResponseEntity<List<TransactionResponse>> getAllUserTransactionsByUserId(String id) {
        List<TransactionResponse> apiTransactions = transactionService.getAllTransactionsByUserId(id);
        return apiTransactions == null ?
                ResponseEntity.notFound().build()
                : ResponseEntity.ok(apiTransactions);
    }

    @Override
    public ResponseEntity<TransactionResponse> getUserTransactionById(String id) {
        TransactionResponse response = transactionService.getTransactionById(id);
        jsonLogger.logAsJson("Found transaction: ", response);
        return response == null ?
                ResponseEntity.notFound().build()
                : ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<TransactionResponse> patchTransactionById(String id, TransactionPatch postTransaction) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionResponse> patchTransactionStatusById(String id, TransactionStatusPatch postTransaction) {
        TransactionResponse transactionResponse = transactionService.updateTransactionStatusById(id, postTransaction);
        return transactionResponse == null ?
                ResponseEntity.internalServerError().build()
                : ResponseEntity.ok(transactionResponse);
    }

    @Override
    public ResponseEntity<TransactionResponse> updateUserTransaction(String id, String transactionId, TransactionRequest patchTransaction) {
        return null;
    }
}
