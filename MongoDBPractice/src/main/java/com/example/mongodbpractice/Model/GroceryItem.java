package com.example.mongodbpractice.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("groceryitems")
public class GroceryItem {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private int category,quantity;
    private Categories items;

    public GroceryItem(int id, String name, int category, int quantity, Categories items) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.items = items;
    }

    public Categories getCategories() {
        return items;
    }
    public void setCategories(Categories items) {
        this.items = items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "GroceryItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", quantity=" + quantity +
                ", items=" + items +
                '}';
    }
}
