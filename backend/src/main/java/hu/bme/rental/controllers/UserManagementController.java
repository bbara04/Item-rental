package hu.bme.rental.controllers;

import hu.bme.rental.model.User;
import hu.bme.rental.services.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userManagementService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/by-email")
    public ResponseEntity<User> findByEmail(@RequestParam("email") String email) {
        final User user = userManagementService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(user);
    }

}
