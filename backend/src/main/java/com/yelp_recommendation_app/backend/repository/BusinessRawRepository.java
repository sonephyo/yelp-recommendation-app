package com.yelp_recommendation_app.backend.repository;

import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRawRepository extends MongoRepository<BusinessRawInfo, String> {

    Optional<BusinessRawInfo> findByBusinessId(String businessId);
    Optional<BusinessRawInfo> findByName(String name);

}
