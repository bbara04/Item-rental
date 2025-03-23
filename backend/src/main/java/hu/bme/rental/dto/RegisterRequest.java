package hu.bme.rental.dto;

import hu.bme.rental.utils.StringValidator;
import org.apache.commons.lang3.StringUtils;

public record RegisterRequest(String username, String passkey, String email, String firstName, String lastName) {
    
    public boolean isValid() {
        return StringUtils.isNotBlank(username) &&
               StringUtils.isNotBlank(passkey) &&
               StringValidator.isValidEmail(email) &&
               StringUtils.isNotBlank(firstName) &&
               StringUtils.isNotBlank(lastName);
    }
}
