package hu.bme.rental.services;

import hu.bme.rental.model.User;
import hu.bme.rental.services.usermanagement.UserManagementBusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserManagementBusService userManagementBusService;

    public ResponseEntity<User> findByEmail(@RequestParam("email") String email) {
        final User user = userManagementBusService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(user);
    }

    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userManagementBusService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
