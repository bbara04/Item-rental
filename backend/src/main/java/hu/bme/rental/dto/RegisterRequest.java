package hu.bme.rental.dto;

import io.micrometer.common.util.StringUtils;

public record RegisterRequest(String username, String password, String email, String firstName, String lastName) {
    
    public boolean isValid() {
        return StringUtils.isNotBlank(username) &&
               StringUtils.isNotBlank(password) &&
               StringUtils.isNotBlank(email) &&
               StringUtils.isNotBlank(firstName) &&
               StringUtils.isNotBlank(lastName);
    }
}
