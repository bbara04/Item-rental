package hu.bme.rental.services.authentication;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import hu.bme.rental.dto.RegisterRequest;
import hu.bme.rental.model.BasicUserCredentials;
import hu.bme.rental.model.User;
import hu.bme.rental.services.usermanagement.UserManagementBusService;
import jakarta.annotation.Nonnull;

@Service
public class BasicUserAuthService {

    private final UserManagementBusService userManagementBusService;
    
    private final List<BasicUserCredentials> basicUserCredentials;

    public BasicUserAuthService(final @Nonnull UserManagementBusService userManagementBusService) {
        this.userManagementBusService = userManagementBusService;
        //Temporary hardcoded users
        List<User> users = userManagementBusService.getAllUsers();
        this.basicUserCredentials = users.stream()
                                         .map(user -> new BasicUserCredentials(user, "password"))
                                         .collect(Collectors.toList());

    }

    public User validateUserByPassword(final @Nonnull String email, final @Nonnull String password) {
        final BasicUserCredentials userCredentials = basicUserCredentials.stream()
                                                                        .filter(userCredential -> userCredential.user().email().equals(email) && userCredential.password().equals(password))
                                                                        .findFirst()
                                                                        .orElse(null);
        if (userCredentials == null) {
            return null;
        }
        return userCredentials.user(); 
    }

    public User registerUser(final @Nonnull RegisterRequest registerRequest) {
        List<User> users = userManagementBusService.getAllUsers();
        if (users.stream().anyMatch(user -> user.userName().equals(registerRequest.username()) 
                                        || user.email().equals(registerRequest.email())
        )) {
            throw new IllegalArgumentException("User already exists");
        }
        User newUser = new User(null, registerRequest.username(), registerRequest.email(), registerRequest.firstName(), registerRequest.lastName());
        userManagementBusService.addUser(newUser);
        basicUserCredentials.add(new BasicUserCredentials(newUser, registerRequest.passkey()));
        return newUser;
    }
    
}
