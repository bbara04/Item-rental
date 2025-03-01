package hu.bme.rental.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public record User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty("id") Long id,
        @JsonProperty("userName") String userName,
        @JsonProperty("password") String password,
        @JsonProperty("email") String email,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName) {

}
