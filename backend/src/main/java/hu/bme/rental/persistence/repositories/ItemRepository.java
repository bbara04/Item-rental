package hu.bme.rental.persistence.repositories;

import hu.bme.rental.persistence.models.Item;
import hu.bme.rental.persistence.models.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {
    List<Item> findAllByCategoriesContains(Set<ItemCategory> categories);

}
