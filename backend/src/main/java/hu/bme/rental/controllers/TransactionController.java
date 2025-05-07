package hu.bme.rental.controllers;

import hu.bme.rental.api.model.*;
import hu.bme.rental.api.rest.TransactionManagementApi;
import hu.bme.rental.services.transactionmanagement.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TransactionController implements TransactionManagementApi {

    private TransactionService transactionService;

    @Override
    public ResponseEntity<TransactionResponse> createUserTransaction(String id, TransactionRequest postTransaction) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteUserTransaction(String id, String transactionId) {
        return null;
    }

    @Override
    public ResponseEntity<List<TransactionResponse>> getAllUserTransactions(String id) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionResponse> updateUserTransaction(String id, String transactionId, TransactionRequest patchTransaction) {
        return null;
    }
}
