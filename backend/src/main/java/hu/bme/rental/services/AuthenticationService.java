package hu.bme.rental.services;

import hu.bme.rental.dto.LoginRequest;
import hu.bme.rental.dto.RegisterRequest;
import hu.bme.rental.model.User;
import hu.bme.rental.services.authentication.BasicUserAuthService;
import hu.bme.rental.services.authentication.GoogleUserAuthService;
import hu.bme.rental.utils.StringValidator;
import org.apache.commons.lang3.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final BasicUserAuthService basicUserAuthService;

    private final GoogleUserAuthService googleUserAuthService;

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
