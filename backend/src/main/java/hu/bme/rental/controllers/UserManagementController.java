package hu.bme.rental.controllers;

import hu.bme.rental.api.model.UserRequest;
import hu.bme.rental.api.rest.UserManagementApi;
import hu.bme.rental.services.usermanagement.UserManagementService;
import lombok.RequiredArgsConstructor;
import hu.bme.rental.api.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class UserManagementController implements UserManagementApi {

    private final UserManagementService userManagementService;

    @Override
    public ResponseEntity<Void> deleteUserById(String id) {
        boolean deleted = userManagementService.deleteUserById(id);
        return deleted
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();

    }

    @Override
    public ResponseEntity<User> findByEmail(String email) {

        User apiUsers = userManagementService.findByEmail(email);
        if (apiUsers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(apiUsers);

    }

    @Override
    public ResponseEntity<List<User>> getAllUser() {
        List<User> apiUsers = userManagementService.getAllUsers();
        return ResponseEntity.ok(apiUsers);

    }

    @Override
    public ResponseEntity<User> getUserdataById(String id) {
        User apiUser = userManagementService.getUserById(id);
        if (apiUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(apiUser);

    }

    @Override
    public ResponseEntity<User> updateUserdataById(String id, UserRequest patchUser) {
        User updatedUser = userManagementService.updateUserById(id, patchUser);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);

    }
}
