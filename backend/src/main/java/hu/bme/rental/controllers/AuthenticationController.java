package hu.bme.rental.controllers;

import hu.bme.rental.api.rest.AuthenticationApi;
import hu.bme.rental.services.authentication.BasicUserAuthService;
import hu.bme.rental.services.authentication.GoogleUserAuthService;
import lombok.RequiredArgsConstructor;
import org.openapitools.model.LoginRequest;
import org.openapitools.model.RegisterRequest;
import org.openapitools.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController implements AuthenticationApi {


    private final BasicUserAuthService basicUserAuthService;

    private final GoogleUserAuthService googleUserAuthService;


    @Override
    public ResponseEntity<User> loginByBasic(LoginRequest loginRequest) {
        return null;
    }

    @Override
    public ResponseEntity<User> loginByGoogle(LoginRequest loginRequest) {
        return null;
    }

    @Override
    public ResponseEntity<User> registerByBasic(RegisterRequest registerRequest) {
        return null;
    }

    @Override
    public ResponseEntity<User> registerByGoogle(RegisterRequest registerRequest) {
        return null;
    }

}
