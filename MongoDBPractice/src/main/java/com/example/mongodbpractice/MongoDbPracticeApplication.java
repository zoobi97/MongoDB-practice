package com.example.mongodbpractice;

import com.example.mongodbpractice.Model.GroceryItem;
import com.example.mongodbpractice.Repository.CustomItemRepository;
import com.example.mongodbpractice.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@SpringBootApplication
@EnableMongoRepositories
public class MongoDbPracticeApplication implements CommandLineRunner {

    @Autowired
    ItemRepository groceryItemRepo;

    @Autowired
    CustomItemRepository customItemRepository;

    public static void main(String[] args) {
        SpringApplication.run(MongoDbPracticeApplication.class, args);
    }

    public void run(String... args) {

//        System.out.println("-----CREATE GROCERY ITEMS-----\n");
//
//        createGroceryItems();
//
//        System.out.println("\n-----SHOW ALL GROCERY ITEMS-----\n");
//
//        showAllGroceryItems();
//
//        System.out.println("\n-----GET ITEM BY NAME-----\n");
//
//        getGroceryItemByName("Whole Wheat Biscuit");
//
//        System.out.println("\n-----GET ITEMS BY CATEGORY-----\n");
//
//        getItemsByCategory("millets");
//
//        System.out.println("\n-----UPDATE CATEGORY NAME OF SNACKS CATEGORY-----\n");
//
//        updateCategoryName("snacks","Whole Wheat Biscuit");
//
//        System.out.println("\n-----DELETE A GROCERY ITEM-----\n");
//
//        deleteGroceryItem("Kodo Millet");
//
//        System.out.println("\n-----FINAL COUNT OF GROCERY ITEMS-----\n");
//
//        findCountOfGroceryItems();
//
//        System.out.println("\n-----UPDATE QUANTITY OF A GROCERY ITEM-----\n");
//
//        updateItemQuantity("Pepsico","Salty","snacks", "10");
//
//        System.out.println("\n-----THANK YOU-----");

    }

    // Print details in readable form

//    public String getItemDetails(GroceryItem item) {
//
//        System.out.println(
//                "Item Name: " + item.getName() +
//                        ", \nQuantity: " + item.getQuantity() +
//                        ", \nItem Category: " + item.getCategory()
//        );
//
//        return "";
//    }

    //CREATE
//    void createGroceryItems() {
//        System.out.println("Data creation started...");
//        groceryItemRepo.save(new GroceryItem(1, "Whole Wheat Biscuit", "snacks", 5));
//        groceryItemRepo.save(new GroceryItem(2, "XYZ Kodo Millet healthy", "millets", 2));
//        groceryItemRepo.save(new GroceryItem(3, "Dried Whole Red Chilli", "spices", 2));
//        groceryItemRepo.save(new GroceryItem(4, "Healthy Pearl Millet", "millets", 1));
//        groceryItemRepo.save(new GroceryItem(5, "Bonny Cheese Crackers Plain", "snacks", 6));
//        System.out.println("Data creation complete...");
//    }

    // READ
    // 1. Show all the data
//    public void showAllGroceryItems() {
//        groceryItemRepo.findAll().forEach(item -> System.out.println(getItemDetails(item)));
//    }

    // 2. Get item by name
//    public void getGroceryItemByName(String name) {
//        System.out.println("Getting item by name: " + name);
//        GroceryItem item = groceryItemRepo.findItemByName(name);
//        System.out.println(getItemDetails(item));
//    }

    // 3. Get name and quantity of a all items of a particular category
//    public void getItemsByCategory(String category) {
//        System.out.println("Getting items for the category " + category);
//        List<GroceryItem> list = groceryItemRepo.findAll(category);
//
//        list.forEach(item -> System.out.println("Name: " + item.getName() + ", Quantity: " + item.getQuantity()));
//    }

    // 4. Get count of documents in the collection
//    public void findCountOfGroceryItems() {
//        long count = groceryItemRepo.count();
//        System.out.println("Number of documents in the collection: " + count);
//    }

//    public void updateCategoryName(String category,String id) {
//
//        // Change to this new value
//        String newCategory = "munchies";
//
//        // Find all the items with the category snacks
////        List<GroceryItem> list = groceryItemRepo.findAll(category);
//        GroceryItem item = groceryItemRepo.findById(id).orElse(null);
//
//        item.setCategory(newCategory);
//
//        GroceryItem itemsUpdated=groceryItemRepo.save(item);
//
////        list.forEach(item -> {
////            // Update the category in each document
////            item.setCategory(newCategory);
////        });
//
//        // Save all the items in database
////        List<GroceryItem> itemsUpdated = groceryItemRepo.saveAll(list);
//
//        if (itemsUpdated != null)
//            System.out.println("Successfully updated " + itemsUpdated.getId() + " item with new category: "+itemsUpdated.getCategory());
//    }

    // UPDATE
//    public void updateItemQuantity(String id,String name, String Category,String newQuantity) {
//        System.out.println("Updating quantity for " + name);
//        customItemRepository.updateItem(id,name, Category,newQuantity);
//    }

    // DELETE
//     public void deleteGroceryItem(String id){
//        groceryItemRepo.deleteById(id);
//        System.out.println("Item pertaining id: "+id+" is deleted.");
//    }

}
