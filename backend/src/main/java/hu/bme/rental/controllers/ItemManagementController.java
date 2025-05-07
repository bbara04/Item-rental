package hu.bme.rental.controllers;

import hu.bme.rental.api.model.Item;
import hu.bme.rental.api.model.ItemRequest;
import hu.bme.rental.api.rest.ItemManagementApi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemManagementController implements ItemManagementApi {
    @Override
    public ResponseEntity<Void> deleteItemById(String id) {
        return null;
    }

    @Override
    public ResponseEntity<List<Item>> getAllItems() {
        return null;
    }

    @Override
    public ResponseEntity<List<Item>> getItemsByCategory(String categoryId) {
        return null;
    }

    @Override
    public ResponseEntity<Item> getItemsById(String id) {
        return null;
    }

    @Override
    public ResponseEntity<Item> updateItemDataById(String id, ItemRequest patchItem) {
        return null;
    }
}
