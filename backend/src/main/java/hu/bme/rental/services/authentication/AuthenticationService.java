package hu.bme.rental.services.authentication;


import hu.bme.rental.api.model.LoginRequest;
import hu.bme.rental.api.model.LoginType;
import hu.bme.rental.api.model.User;
import hu.bme.rental.api.model.UserRequest;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.UserMapper;
import hu.bme.rental.services.usermanagement.UserManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserManagementService userManagementService;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final JsonLogger jsonLogger;

    public User logUserInWithEmail(LoginRequest loginRequest) {
        User userWithEmail = userManagementService.findByEmail(loginRequest.getEmail());
        // Auth ellenőrzés
        if (userWithEmail != null &&
                passwordEncoder.matches(loginRequest.getPasskey(), userWithEmail.getPasswordHash())) {
            jsonLogger.logAsJson("Login user with:", userWithEmail);
            return userWithEmail;
        }
        log.info("Bad Access request");
        return null;
    }

    public User loginWithGoogle(LoginRequest loginRequest) {
        User userWithEmail = userManagementService.findByEmail(loginRequest.getEmail());
        // Auth ellenőrzés
        if (userWithEmail != null) {
            jsonLogger.logAsJson("Login user with:", userWithEmail);
            return userWithEmail;
        }
        log.info("Bad Access request");
        return null;
    }

    public User registerUserWithLocal(User registeringUser) {
        if (registeringUser.getPasswordHash() != null){
            registeringUser.setLoginType(LoginType.LOCAL);
            registeringUser.setRatings(5.0f);
            String hashedPassword = passwordEncoder.encode(registeringUser.getPasswordHash());
            registeringUser.setPasswordHash(hashedPassword);
            if (userManagementService.findByEmail(registeringUser.getEmail()) != null) {
                log.warn("This email is already exists!");
                return null;
            }
            return userManagementService.createAppUser(registeringUser);
        }
        return null;
    }

    public User registerUserWithGoogle(UserRequest regRequestedUser) {
        regRequestedUser.setRatings(5.0f);
        if (userManagementService.findByEmail(regRequestedUser.getEmail()) != null) {
            log.warn("This email is already exists!");
            return null;
        }
        User castedUser = userMapper.toApiDto(regRequestedUser);
        String hashedPassword = passwordEncoder.encode(castedUser.getEmail());
        castedUser.setPasswordHash(hashedPassword);
        castedUser.setLoginType(LoginType.GOOGLE);
        return userManagementService.createAppUser(castedUser);
    }

}
