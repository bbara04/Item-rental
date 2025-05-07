package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University, String> {
}
