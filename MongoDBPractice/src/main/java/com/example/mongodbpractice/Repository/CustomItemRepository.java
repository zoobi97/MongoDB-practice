package com.example.mongodbpractice.Repository;

public interface CustomItemRepository{
    void updateItem(String id,String name,String category,String quantity);
}
