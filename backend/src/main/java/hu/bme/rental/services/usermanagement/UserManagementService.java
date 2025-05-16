package hu.bme.rental.services.usermanagement;

import hu.bme.rental.api.model.*;
import hu.bme.rental.configuration.JsonLogger;
import hu.bme.rental.mappers.*;
import hu.bme.rental.persistence.models.AppUser;
import hu.bme.rental.persistence.repositories.*;
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

    private final BalanceRepository balanceRepository;
    private final BalanceMapper balanceMapper;

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    private final UniversityRepository universityRepository;
    private final UniversityMapper universityMapper;

    private final FacultyRepository facultyRepository;
    private final FacultyMapper facultyMapper;

    private final JsonLogger jsonLogger;


    public User createAppUser(User registeringUser) {
        if(facultyRepository.findById(registeringUser.getFaculty().getId().toString()).isEmpty()
            || universityRepository.findById(registeringUser.getUniversity().getId().toString()).isEmpty()) {
            log.error("Bad Faculty or/and University");
            return null;
        }
        try {
            // Create and map the AppUser first
            AppUser newAppUser = new AppUser();
            newAppUser.setPasswordHash(registeringUser.getPasswordHash());

            hu.bme.rental.persistence.models.Image image;
            if (registeringUser.getImage() != null && registeringUser.getImage().getId() != null) {
                image =
                        imageRepository.findById(registeringUser.getImage().getId().toString())
                                .orElse(
                                        new hu.bme.rental.persistence.models.Image()
                                );
            }
            else {
                // Create a new Balance entity if not provided
                image = new hu.bme.rental.persistence.models.Image();
                imageMapper.toEntity(registeringUser.getImage(), image);
            }
            imageRepository.save(image);
            newAppUser.setImage(image);

            hu.bme.rental.persistence.models.Balance balance;
            if (registeringUser.getBalance() != null && registeringUser.getBalance().getId() != null) {
                 balance =
                        balanceRepository.findById(registeringUser.getBalance().getId().toString())
                                .orElse(
                                        new hu.bme.rental.persistence.models.Balance()
                                );
            }
            else {
                // Create a new Balance entity if not provided
                balance = new hu.bme.rental.persistence.models.Balance();
            }
            balanceMapper.toEntity(registeringUser.getBalance(), balance);
            balanceRepository.save(balance);
            newAppUser.setBalance(balance);

            userMapper.toEntity(registeringUser, newAppUser);

            // Get existing University and Faculty from DB instead of creating new ones
            hu.bme.rental.persistence.models.Faculty faculty =
                    facultyRepository.findById(registeringUser.getFaculty().getId().toString())
                            .orElseThrow(() -> new RuntimeException("Faculty not found"));

            hu.bme.rental.persistence.models.University university =
                    universityRepository.findById(registeringUser.getUniversity().getId().toString())
                            .orElseThrow(() -> new RuntimeException("University not found"));

            // Set the relationships
            newAppUser.setFaculty(faculty);
            newAppUser.setUniversity(university);

            //jsonLogger.logAsJson("Wanna be saved AppUser", newAppUser);

            // Save the AppUser
            userRepository.save(newAppUser);
            userRepository.flush();

            jsonLogger.logAsJson("Saved persistence user: ", newAppUser);
            return userMapper.toApiDto(newAppUser);

        }catch (Exception e) {
            log.error("Error with newUser saving {}", registeringUser.getUserName(), e);
        }
        return null;
    }

    /**
     * Deletes a appUser by ID
     * @param id AppUser ID
     * @return true if successful, false if appUser not found
     */
    @Transactional
    public boolean deleteUserById(String id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
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
        return userMapper.toApiDtoList(appUsers);
    }

    /**
     * Gets appUser by ID
     * @param id AppUser ID
     * @return AppUser if found, or null
     */
    @Transactional
    public User getUserById(String id) {
        try {
            Optional<AppUser> appUser = userRepository.findById(id);
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
            Optional<AppUser> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                AppUser targetAppUser = userOptional.get();

                userMapper.updateUserEntityFromApiUserRequest(patchUser, targetAppUser);

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

    public List<University> getAllUniversities() {
        List<hu.bme.rental.persistence.models.University> persistUniversities = universityRepository.findAll();
        return persistUniversities
                .stream()
                .map(universityMapper::toApiDto)
                .toList();
    }

    public List<Faculty> getAllFaculties() {
        List<hu.bme.rental.persistence.models.Faculty> persistFaculties = facultyRepository.findAll();
        return persistFaculties
                .stream()
                .map(facultyMapper::toApiDto)
                .toList();
    }

    private User mapAppUserToApiUser(AppUser appUser) {
        User user = userMapper.toApiDto(appUser);
        user.getBalance().setUserID(appUser.getId());
        return user;
    }
}
