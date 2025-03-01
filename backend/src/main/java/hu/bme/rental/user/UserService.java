package hu.bme.rental.user;

import java.util.List;

import org.springframework.stereotype.Service;

import hu.bme.rental.model.User;

@Service
public class UserService {

    private final List<User> users;

    public UserService() {
        this.users = List.of(new User(0L, "user1", "password", "test1@gmail.com", "user1", "test"),
                            new User(1L, "user2", "password", "test2@gmail.com", "user2", "test"));       
    }

    public List<User> getAllUsers() {
        return users;
    }

    public boolean validateUser(String username, String password) {
        return users.stream().anyMatch(user -> user.match(username, password));
    }

    public User registerUser(User newUser) {
        if (users.stream().anyMatch(user -> user.userName().equals(newUser.userName()))) {
            throw new IllegalArgumentException("User already exists");
        }
        users.add(newUser);
        return newUser;
    }

}
