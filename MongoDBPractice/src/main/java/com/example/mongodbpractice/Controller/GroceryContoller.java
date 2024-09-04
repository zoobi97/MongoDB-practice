package com.example.mongodbpractice.Controller;

import com.example.mongodbpractice.Model.GroceryItem;
import com.example.mongodbpractice.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
public class GroceryContoller {

    @Autowired
    ItemRepository itemRepository;

    // Find All Items
    @GetMapping("/getGroceryItems")
    public List<GroceryItem> showAllGroceryItems() {
        List<GroceryItem> groceryItem = itemRepository.joinedData();
        System.out.println("Returned data: "+groceryItem);
        return groceryItem;
    }

    // Find Item By ID
//    @GetMapping("/getGroceryItemById/{id}")
//    public Optional<GroceryItem> getGroceryItemById(@PathVariable("id") int id) {
//        Optional<GroceryItem> item = itemRepository.findById(id);
//        return item;
//    }

    @GetMapping("/getGroceryItemById/{id}")
    public Optional<GroceryItem> getGroceryItemById(@PathVariable("id") int id) {
        Optional<GroceryItem> item = itemRepository.joinedDataById(id);
        return item;
    }

    //Add Single Item
    @PostMapping(value = "/addGroceryItem", consumes = "application/json")
    public GroceryItem createGroceryItems(@RequestBody GroceryItem item) {
        System.out.println("Received item in this method    : "+item.getId());
        if (item != null) {
            itemRepository.save(item);
        }
        return item;
    }

    //Add Multiple Items
    @PostMapping(value = "/addGroceryItems", consumes = "application/json")
    public List<GroceryItem> createGroceryItems(@RequestBody List<GroceryItem> items) {
        if (items != null && !items.isEmpty()) {
            itemRepository.saveAll(items);
        }
        return items;
    }

    //Update Items
    @PutMapping(value = "/updateGroceryItem/{id}", consumes = "application/json")
    public ResponseEntity<GroceryItem> updateGroceryItem(@PathVariable("id") int id, @RequestBody GroceryItem item) {
        Optional<GroceryItem> item1 = itemRepository.findById(id);
        if (item1.isPresent()) {
            System.out.println("item1.get= "+item1.get());
            GroceryItem groceryItem = item1.get();
            groceryItem.setId(id);
            groceryItem.setName(item.getName());
            groceryItem.setCategory(item.getCategory());
            groceryItem.setQuantity(item.getQuantity());
            return new ResponseEntity<>(itemRepository.save(groceryItem), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Delete All Records
    @DeleteMapping(value = "/deleteGroceryItems")
    public String deleteGroceryItems(){
        itemRepository.deleteAll();
        return "All records deleted.";
    }

    //Delete By ID
    @DeleteMapping(value = "/deleteGroceryItems/{id}")
    public String deleteGroceryItemById(@PathVariable("id") int id){
        itemRepository.deleteById(id);
        return "Record deleted with id: "+id;
    }
}
