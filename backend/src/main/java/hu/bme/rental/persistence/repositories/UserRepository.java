package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {

    Optional<AppUser> findByEmail(String email);

}
