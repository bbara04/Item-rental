package hu.bme.rental.model;

import jakarta.annotation.Nonnull;

public record BasicUserCredentials(@Nonnull User user, @Nonnull String password) {
    
}
