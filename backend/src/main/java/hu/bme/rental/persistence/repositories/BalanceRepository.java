package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.Balance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceRepository extends JpaRepository<Balance, String> {
}
