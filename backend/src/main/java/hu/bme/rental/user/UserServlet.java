package hu.bme.rental.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.rental.model.User;

@RestController
@RequestMapping("/api/user")
public class UserServlet {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
