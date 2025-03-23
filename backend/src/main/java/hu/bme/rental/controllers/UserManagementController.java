package hu.bme.rental.controllers;

import hu.bme.rental.api.rest.UserManagementApi;
import hu.bme.rental.services.usermanagement.UserManagementBusService;
import lombok.RequiredArgsConstructor;
import org.openapitools.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class UserManagementController implements UserManagementApi {

    private final UserManagementBusService userManagementBusService;


    @Override
    public ResponseEntity<User> findByEmail(String email) {
        return null;
    }

    @Override
    public ResponseEntity<List<User>> getAllUsers() {
        return null;
    }
}
