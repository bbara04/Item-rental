package hu.bme.rental.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public record User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty("id") Long id,
        @JsonProperty("userName") String userName,
        @JsonProperty("email") String email,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName) {

}
