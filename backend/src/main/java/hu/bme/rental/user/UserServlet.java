package hu.bme.rental.user;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.rental.dto.LoginRequest;
import hu.bme.rental.dto.RegisterRequest;
import hu.bme.rental.model.User;
import hu.bme.rental.tools.StringValidator;
import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Nonnull;

@RestController
@RequestMapping("/api/user")
public class UserServlet {
    private final UserService userService;

    public UserServlet(final @Nonnull UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(final @RequestBody LoginRequest loginRequest) {
        if (StringValidator.isValidEmail(loginRequest.email()) ||
            StringUtils.isNotBlank(loginRequest.password())) {
            return ResponseEntity.badRequest().body("Email and password must be provided.");
        }
        
        boolean isValid = userService.validateUser(loginRequest.email(), loginRequest.password());
        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(final @RequestBody RegisterRequest registerRequest) {
        if (!registerRequest.isValid()) {
            return ResponseEntity.badRequest().body("All fields must be provided correctly.");
        }
        
        try {
            User newUser = userService.registerUser(
                new User(null, registerRequest.username(), registerRequest.password(), registerRequest.email(),
                         registerRequest.firstName(), registerRequest.lastName())
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists or registration failed.");
        }
    }
    
}
