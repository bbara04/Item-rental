package hu.bme.rental.authentication;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import hu.bme.rental.dto.RegisterRequest;
import hu.bme.rental.model.GoogleUserCredentials;
import hu.bme.rental.model.User;
import hu.bme.rental.user.UserService;
import jakarta.annotation.Nonnull;

@Service
public class GoogleUserAuthService {

    private final UserService userService;
    
    private final List<GoogleUserCredentials> googleUserCredentials;

    public GoogleUserAuthService(final @Nonnull UserService userService) {
        this.userService = userService;
        this.googleUserCredentials = new ArrayList<>();
    }

    public User validateUser(final @Nonnull String email, final @Nonnull String uniqueId) {
        final GoogleUserCredentials userCredentials = googleUserCredentials.stream()
                                                                        .filter(userCredential -> userCredential.user().email().equals(email) && userCredential.uniqueId().equals(uniqueId))
                                                                        .findFirst()
                                                                        .orElse(null); 
        if (userCredentials == null) {
            return null;
        }
        return userCredentials.user();
    }

    public User registerUser(final @Nonnull RegisterRequest registerRequest) {
        List<User> users = userService.getAllUsers();
        // TODO: On google authentication username is not provided so defaulting to email username eg.: email@domain -> email, 
        // If email username is already taken, by another basic user, then email is not usable for google authentication
        if (users.stream().anyMatch(user -> user.userName().equals(registerRequest.username()) 
                                        || user.email().equals(registerRequest.email())
        )) {
            throw new IllegalArgumentException("User already exists");
        }
        User newUser = new User(null, registerRequest.username(), registerRequest.email(), registerRequest.firstName(), registerRequest.lastName());
        userService.addUser(newUser);
        googleUserCredentials.add(new GoogleUserCredentials(newUser, registerRequest.passkey()));
        return newUser;
    }
    
}
