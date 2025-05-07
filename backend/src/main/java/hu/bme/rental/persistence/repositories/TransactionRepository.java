package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.RentingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<RentingTransaction, String> {
}
