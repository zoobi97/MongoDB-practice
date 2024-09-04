package com.example.mongodbpractice.Repository;

import com.example.mongodbpractice.Model.Categories;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CategoryInterface extends MongoRepository<Categories,Integer> {
    @Query("{status: '?0'}")
    public Categories findItemByStatus(int status);
}
