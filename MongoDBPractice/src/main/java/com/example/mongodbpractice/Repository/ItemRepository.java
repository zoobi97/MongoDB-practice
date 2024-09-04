package com.example.mongodbpractice.Repository;

import com.example.mongodbpractice.Model.GroceryItem;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends MongoRepository<GroceryItem,Integer> {
    @Query("{name: '?0'}")
    GroceryItem findItemByName(String name);

    @Query(value = "{category: '?0'}",fields="{'name': 1,'quantity': 1}")
    List<GroceryItem> findAll(String category);

    public long count();

    @Query("db.orders.updateOne({id: ?1},{$set: {name: ?2,category:?3,quantity:?4}})")
    public GroceryItem updateItem(int id, String name,String category,int quantity);

//    @Query
//    @Aggregation(pipeline = {
//            "{$lookup: {from: 'Category', localField: 'category', foreignField: '_id', as: 'items'}}",
//            "{$unwind: '$items'}"
//            ,"{$project: {id: '$_id' ,name: 1,category: 1 ,quantity: 1,'Categories.name': 1 }}"
//    })

    @Aggregation(pipeline = {
            "{$lookup: {from: 'Category', localField: 'category', foreignField: '_id', as: 'items'}}",
            "{$unwind: '$items'}"
            ,"{$project: {id: '$_id' ,name: 1,category: 1 ,quantity: 1,'items': 1 }}"
    })
    List<GroceryItem> joinedData();

    @Aggregation(pipeline = {
            "{$lookup: {from: 'Category', localField: 'category', foreignField: '_id', as: 'items'}}",
            "{$unwind: '$items'}"
            ,"{$match: {id: ?0}}"
    })
    Optional<GroceryItem> joinedDataById(int identity);

}
