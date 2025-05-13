package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.RentingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<RentingTransaction, String> {
    List<RentingTransaction> findAllByRentedItem_Id(Long itemId);

    List<RentingTransaction> findAllByRenterAppUser_Faculty_Id(Long renterAppUserFacultyId);

    List<RentingTransaction> findAllByRenterAppUser_Id(Long renterAppUserId);
}
