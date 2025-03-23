package hu.bme.rental.services.usermanagement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import hu.bme.rental.model.User;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

@Service
public class UserManagementBusService {

    private final List<User> users;

    public UserManagementBusService() {
        this.users = Lists.newArrayList(new User(0L, "user1", "test1@gmail.com", "user1", "test"),
                            new User(1L, "user2", "test2@gmail.com", "user2", "test"),
                            new User(2L, "bbara", "bdbarni@gmail.com", "Barnabás", "Balogh"));       
    }

    public List<User> getAllUsers() {
        return users;
    }

    public User findByEmail(final @Nullable String email) {
        return users.stream().filter(user -> user.email().equals(email)).findFirst().orElse(null);
    }

    public void addUser(final @Nonnull User user) {
        users.add(user);
    }

    public void deleteUser(final @Nonnull User user) {
        users.remove(user);
    }

}
