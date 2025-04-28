package hu.bme.rental.controllers;

import hu.bme.rental.api.model.UserPatchRequest;
import hu.bme.rental.api.rest.UserManagementApi;
import hu.bme.rental.services.usermanagement.UserManagementBusService;
import lombok.RequiredArgsConstructor;
import hu.bme.rental.api.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class UserManagementController implements UserManagementApi {

    private final UserManagementBusService userManagementBusService;


    @Override
    public ResponseEntity<Void> deleteUserById(String id) {
        return null;
    }

    @Override
    public ResponseEntity<User> findByEmail(String email) {
        return null;
    }

    @Override
    public ResponseEntity<List<User>> getAllUser() {
        return null;
    }


    @Override
    public ResponseEntity<User> getUserdataById(String id) {
        return null;
    }

    @Override
    public ResponseEntity<User> updateUserdataById(String id, UserPatchRequest patchUser) {
        return null;
    }
}
