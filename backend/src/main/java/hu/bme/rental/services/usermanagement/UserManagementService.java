package hu.bme.rental.services.usermanagement;

import hu.bme.rental.api.model.User;
import hu.bme.rental.api.model.UserRequest;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.UserMapper;
import hu.bme.rental.persistence.models.AppUser;
import hu.bme.rental.persistence.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JsonLogger jsonLogger;

    /**
     * Deletes a appUser by ID
     * @param id AppUser ID
     * @return true if successful, false if appUser not found
     */
    @Transactional
    public boolean deleteUserById(String id) {
        try {
            Long userId = Long.parseLong(id);
            if (userRepository.existsById(userId)) {
                userRepository.deleteById(userId);
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("Invalid appUser ID format: {}", id, e);
            return false;
        }
    }

    /**
     * Finds a appUser by email
     * @param email Email to search for
     * @return AppUser if found, or null
     */
    @Transactional
    public User findByEmail(String email) {
        Optional<AppUser> appUser = userRepository.findByEmail(email);
        return appUser.map(this::mapAppUserToApiUser).orElse(null);
    }

    /**
     * Gets all appUsers in the system
     * @return List of all appUsers
     */
    @Transactional
    public List<User> getAllUsers() {
        List<AppUser> appUsers = userRepository.findAll();
        for (AppUser appUser : appUsers) {
            jsonLogger.logAsJson("User details", appUser);
        }
        return userMapper.appUsersToUsers(appUsers);
    }

    /**
     * Gets appUser by ID
     * @param id AppUser ID
     * @return AppUser if found, or null
     */
    @Transactional
    public User getUserById(String id) {
        try {
            Long userId = Long.parseLong(id);
            Optional<AppUser> appUser = userRepository.findById(userId);
            jsonLogger.logAsJson("User details", appUser.isPresent() ? appUser.get() : " ");
            return appUser.map(this::mapAppUserToApiUser).orElse(null);
        } catch (Exception e) {
            log.error("Invalid appUser ID format: {}", id, e);
            return null;
        }
    }

    /**
     * Updates an appUser with the provided data
     * @param id AppUser ID
     * @param patchUser AppUser data to update
     * @return Updated appUser or null if not found
     */
    @Transactional
    public User updateUserById(String id, UserRequest patchUser) {
        try {
            Long userId = Long.parseLong(id);
            Optional<AppUser> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                AppUser targetAppUser = userOptional.get();

                userMapper.updateAppUserFromUserRequest(patchUser, targetAppUser);

                AppUser updatedUser = userRepository.saveAndFlush(targetAppUser);
                return mapAppUserToApiUser(updatedUser);
            }
            log.error("AppUser with ID: {} not found in DB", id);
            return null;
        } catch (Exception e) {
            log.error("Invalid appUser ID format: {}", id, e);
            return null;
        }
    }

    private User mapAppUserToApiUser(AppUser appUser) {
        User user = userMapper.appUserToUser(appUser);
        user.getBalance().setUserID(appUser.getId());
        return user;
    }
}
