package hu.bme.rental.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.rental.dto.LoginRequest;
import hu.bme.rental.dto.RegisterRequest;
import hu.bme.rental.model.User;
import hu.bme.rental.tools.StringValidator;
import io.micrometer.common.util.StringUtils;

@RestController
@RequestMapping("/api/auth")
public class UserAuthServlet {
    
    @Autowired
    private BasicUserAuthService basicUserAuthService;
    @Autowired
    private GoogleUserAuthService googleUserAuthService;

    @PostMapping("/basic/login")
    public ResponseEntity<?> loginByBasic(final @RequestBody LoginRequest loginRequest) {
        if (!StringValidator.isValidEmail(loginRequest.email())
                || StringUtils.isBlank(loginRequest.passkey())) {
            return ResponseEntity.badRequest().body("Email and password must be provided.");
        }

        final User user = basicUserAuthService.validateUserByPassword(loginRequest.email(), loginRequest.passkey());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/basic/register")
    public ResponseEntity<?> registerByBasic(final @RequestBody RegisterRequest registerRequest) {
        if (!registerRequest.isValid()) {
            return ResponseEntity.badRequest().body("All fields must be provided correctly.");
        }

        try {
            User newUser = basicUserAuthService.registerUser(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists or registration failed.");
        }
    }

    @PostMapping("/google/login")
    public ResponseEntity<?> loginByGoogle(final @RequestBody LoginRequest loginRequest) {
        if (!StringValidator.isValidEmail(loginRequest.email())
                || StringUtils.isBlank(loginRequest.passkey())) {
            return ResponseEntity.badRequest().body("Email and passkey must be provided.");
        }

        final User user = googleUserAuthService.validateUser(loginRequest.email(), loginRequest.passkey());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/google/register")
    public ResponseEntity<?> registerByGoogle(final @RequestBody RegisterRequest registerRequest) {
        if (!registerRequest.isValid()) {
            return ResponseEntity.badRequest().body("All fields must be provided correctly.");
        }

        try {
            User newUser = googleUserAuthService.registerUser(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists or registration failed.");
        }
    }

}
