package hu.bme.rental.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.Nullable;

public record User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty("id") Long id,
        @JsonProperty("userName") String userName,
        @JsonProperty("password") String password,
        @JsonProperty("email") String email,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName) {

        public boolean match(final @Nullable String email, final @Nullable String password) {
                return this.email.equals(email) && this.password.equals(password);
        }

}
