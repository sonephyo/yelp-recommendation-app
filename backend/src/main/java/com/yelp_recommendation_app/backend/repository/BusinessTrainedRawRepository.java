package com.yelp_recommendation_app.backend.repository;

import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import com.yelp_recommendation_app.backend.Models.BusinessTrainedRawModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BusinessTrainedRawRepository extends MongoRepository<BusinessTrainedRawModel, String> {

    Optional<BusinessTrainedRawModel> findByBusinessId(String businessId);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    Optional<List<BusinessTrainedRawModel>> findAllByNameStartingWith(String name);
}
