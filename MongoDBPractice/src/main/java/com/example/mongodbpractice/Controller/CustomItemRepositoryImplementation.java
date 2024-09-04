package com.example.mongodbpractice.Controller;

import com.example.mongodbpractice.Model.GroceryItem;
import com.example.mongodbpractice.Repository.CustomItemRepository;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.sql.Array;

@Component
public class CustomItemRepositoryImplementation extends org.springframework.data.mongodb.core.query.Query implements CustomItemRepository {

    @Autowired
    MongoTemplate template;
    @Override
    public void updateItem(String id, String name, String category, String quantity) {
        Query query =  super.addCriteria(Criteria.where("id").is(id));
        Update update = new Update();
        update.set("name",name);
        update.set("category",category);
        update.set("quantity",quantity);

        UpdateResult result =
                template.updateFirst((org.springframework.data.mongodb.core.query.Query) query,update,
                        GroceryItem.class);
        if(result == null)
            System.out.println("No documents updated");
        else
            System.out.println(result.getModifiedCount() + " document(s) updated..");
    }
}
