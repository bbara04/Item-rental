package hu.bme.rental.controllers;

import hu.bme.rental.api.model.*;
import hu.bme.rental.api.rest.AuthenticationApi;
import hu.bme.rental.services.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import static hu.bme.rental.api.model.LoginType.GOOGLE;
import static hu.bme.rental.api.model.LoginType.LOCAL;
import static hu.bme.rental.api.model.Role.STUDENT;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthenticationController implements AuthenticationApi {

    private final AuthenticationService authenticationService;

    @Override
    public ResponseEntity<User> loginByBasic(LoginRequest loginRequest) {

        User loggedUser = authenticationService.logUserInWithEmail(loginRequest);
        if(loggedUser != null)
            return ResponseEntity.ok(loggedUser);
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<User> loginByGoogle(LoginRequest loginRequest) {
        if (loginRequest.getPasskey() == null || loginRequest.getPasskey().isBlank() || loginRequest.getPasskey().isEmpty()) {
            loginRequest.setPasskey(loginRequest.getEmail());
        }
        log.info(loginRequest.getPasskey());
        log.info(loginRequest.getEmail());
        User loggedUser = authenticationService.loginWithGoogle(loginRequest);
        if(loggedUser != null)
            return ResponseEntity.ok(loggedUser);
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<User> registerByBasic(User regRequestedUser) {
        User newUser = authenticationService.registerUserWithLocal(regRequestedUser);
        if (newUser == null) {
            log.error("Error with creating User");
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(newUser);
    }

    @Override
    public ResponseEntity<User> registerByGoogle(UserRequest regRequestedUser) {
        User newUser = authenticationService.registerUserWithGoogle(regRequestedUser);
        if (newUser == null) {
            log.error("Error with creating User");
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(newUser);
    }


    private User getMockUser() {
        // Create mock Image
        Image mockImage = new Image();
        mockImage.id(1L);
        mockImage.setEntityType("university");
        mockImage.setImageData(new byte[]{0});
        mockImage.setEntityId(1L);
        mockImage.setContentType("image/jpg");
        mockImage.setFileName("user_logo.jpg");
        // Create mock University
        University mockUniversity = new University();
        mockUniversity.id(1L);
        mockUniversity.setName("Budapesti Műszaki és Gazdaságtudományi Egyetem");
        mockUniversity.setAddress("1111 Budapest, Műegyetem rkp. 3.");
        mockUniversity.setDescription("A BME Magyarország legrégebbi műszaki felsőoktatási intézménye.");
        mockUniversity.setWebsite("https://www.bme.hu");
        // Create mock Faculty
        Faculty mockFaculty = new Faculty();
        mockFaculty.id(1L);
        mockFaculty.setName("Villamosmérnöki és Informatikai Kar");
        mockFaculty.setCode("VIK");
        mockFaculty.setDescription("A BME legnagyobb kara, villamosmérnöki és informatikai képzést nyújt.");
        mockFaculty.setUniversity(mockUniversity);
        // Create mock Balance
        Balance mockBalance = new Balance();
        mockBalance.id(1L);
        mockBalance.setUserID(1L);
        mockBalance.setCurrentValue(1000f);
        mockBalance.setUnit("HUF");
        mockBalance.setPayType("CREDIT");
        // Create mock User response
        User mockUser = new User();
        mockUser.id(1L);
        mockUser.setUserName("user1");
        mockUser.setEmail("user1@example.com");
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");
        mockUser.setLoginType(LOCAL);
        mockUser.setRole(STUDENT);
        mockUser.setRatings(5.0f);
        mockUser.setDescription("Amazing user");
        mockUser.setImage(mockImage);
        mockUser.setUniversity(mockUniversity);
        mockUser.setFaculty(mockFaculty);
        mockUser.setBalance(mockBalance);
        return mockUser;
    }
}
