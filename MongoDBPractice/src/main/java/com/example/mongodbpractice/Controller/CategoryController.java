package com.example.mongodbpractice.Controller;

import com.example.mongodbpractice.Model.Categories;
import com.example.mongodbpractice.Repository.CategoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(value = "*")
public class CategoryController {

    @Autowired
    CategoryInterface itemRepository;

    // Find All Items
    @GetMapping("/getCategories")
    public List<Categories> showAllCategories() {
        List<Categories> categories = itemRepository.findAll();
        return categories;
    }

    // Find Item By ID
    @GetMapping("/getCategoryById/{id}")
    public Optional<Categories> getCategoryById(@PathVariable("id") int id) {
        Optional<Categories> item = itemRepository.findById(id);
        return item;
    }

    @GetMapping("/getCategoryByStatus")
    public List<Categories> showAllCategoriesByStatus() {
        List<Categories> categories = itemRepository.findAll();
        return categories.stream().filter(status-> status.getStatus() == 1).collect(Collectors.toList());
    }

    //Add Single Item
    @PostMapping(value = "/addCategory", consumes = "application/json")
    public Categories createCategory(@RequestBody Categories item) {
        System.out.println("Received category in this method: "+item.getName());
        if (item != null) {

            itemRepository.save(item);
        }
        return item;
    }

    //Add Multiple Items
    @PostMapping(value = "/addCategories", consumes = "application/json")
    public List<Categories> createCategories(@RequestBody List<Categories> items) {
        if (items != null && !items.isEmpty()) {
            itemRepository.saveAll(items);
        }
        return items;
    }

    //Update Items
    @PutMapping(value = "/updateCategory/{id}", consumes = "application/json")
    public ResponseEntity<Categories> updateCategory(@PathVariable("id") int id, @RequestBody Categories item) {
        Optional<Categories> item1 = itemRepository.findById(id);
        if (item1.isPresent()) {
            System.out.println("Category= "+item1.get());
            Categories categories = item1.get();
            categories.setId(id);
            categories.setName(item.getName());
            categories.setStatus_name(item.getStatus_name());
            categories.setStatus(item.getStatus());
            return new ResponseEntity<>(itemRepository.save(categories), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Delete All Records
    @DeleteMapping(value = "/deleteCategories")
    public String deleteCategories(){
        itemRepository.deleteAll();
        return "All records deleted.";
    }

    //Delete By ID
    @DeleteMapping(value = "/deleteCategory/{id}")
    public String deleteCategoryId(@PathVariable("id") int id){
        itemRepository.deleteById(id);
        return "Record deleted with id: "+id;
    }
}
