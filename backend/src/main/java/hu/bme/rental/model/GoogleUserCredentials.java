package hu.bme.rental.model;

import jakarta.annotation.Nonnull;

public record GoogleUserCredentials(@Nonnull User user, @Nonnull String uniqueId) {
    
}
