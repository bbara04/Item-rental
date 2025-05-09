package hu.bme.rental.controllers;

import hu.bme.rental.api.model.Image;
import hu.bme.rental.api.model.Item;
import hu.bme.rental.api.model.ItemRequest;
import hu.bme.rental.api.rest.ItemManagementApi;
import hu.bme.rental.services.itemmanagement.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemManagementController implements ItemManagementApi {
    private final ItemService itemService;

    @Override
    public ResponseEntity<Void> deleteItemById(String id) {
        return null;
    }

    @Override
    public ResponseEntity<List<Item>> getAllItems() {
        //List<Item> items = itemService.getAllItems();
        List<Item> items = new ArrayList<>();

        // Create mock Image objects
        Image laptopImage = new Image();
        laptopImage.setId(5L);
        laptopImage.setEntityType("item");
        laptopImage.setContentType("image/jpeg");
        laptopImage.setFileName("laptop.jpg");

        Image bookImage = new Image();
        bookImage.setId(6L);
        bookImage.setEntityType("item");
        bookImage.setContentType("image/jpeg");
        bookImage.setFileName("konyv.jpg");

        Image phoneImage = new Image();
        phoneImage.setId(7L);
        phoneImage.setEntityType("item");
        phoneImage.setContentType("image/png");
        phoneImage.setFileName("phone.png");

        // Create the first Item - Laptop
        Item laptop = new Item(
                1L,
                "Lenovo ThinkPad X1",
                "Kiváló állapotú üzleti laptop, i7 processzor, 16GB RAM, 512GB SSD",
                2500.0f,
                1L,
                laptopImage
        );
        laptop.setCategories(List.of("Elektronikai eszközök", "Laptopok"));

        // Create the second Item - Book
        Item book = new Item(
                2L,
                "Programozás C nyelven",
                "Az alapoktól a haladó technikákig, egyetemi tankönyv",
                500.0f,
                3L,
                bookImage
        );
        book.setCategories(List.of("Könyvek", "Tankönyvek"));

        // Create the third Item - Smartphone
        Item smartphone = new Item(
                3L,
                "Samsung Galaxy S21",
                "Jó állapotú okostelefon, 128GB tárhely",
                1500.0f,
                1L,
                phoneImage
        );
        smartphone.setCategories(List.of("Elektronikai eszközök", "Mobiltelefonok"));

        // add the Items
        items.add(laptop);
        items.add(book);
        items.add(smartphone);


        return ResponseEntity.ok(items);
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
