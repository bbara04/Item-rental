package hu.bme.rental.dto;

import hu.bme.rental.tools.StringValidator;
import io.micrometer.common.util.StringUtils;

public record RegisterRequest(String username, String password, String email, String firstName, String lastName) {
    
    public boolean isValid() {
        return StringUtils.isNotBlank(username) &&
               StringUtils.isNotBlank(password) &&
               StringValidator.isValidEmail(email) &&
               StringUtils.isNotBlank(firstName) &&
               StringUtils.isNotBlank(lastName);
    }
}
