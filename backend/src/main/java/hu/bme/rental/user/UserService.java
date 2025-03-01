package hu.bme.rental.user;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import hu.bme.rental.model.User;
import jakarta.annotation.Nonnull;

@Service
public class UserService {

    private final List<User> users;

    public UserService() {
        this.users = Lists.newArrayList(new User(0L, "user1", "test1@gmail.com", "user1", "test"),
                            new User(1L, "user2", "test2@gmail.com", "user2", "test"));       
    }

    public List<User> getAllUsers() {
        return users;
    }

    public void addUser(final @Nonnull User user) {
        users.add(user);
    }

    public void deleteUser(final @Nonnull User user) {
        users.remove(user);
    }

}
