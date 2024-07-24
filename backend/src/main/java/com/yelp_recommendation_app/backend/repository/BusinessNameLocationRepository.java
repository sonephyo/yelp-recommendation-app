package com.yelp_recommendation_app.backend.repository;

import com.yelp_recommendation_app.backend.dto.BusinessDto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessNameLocationRepository extends MongoRepository<BusinessDto, String> {

    Optional<BusinessDto> findById(String id);

}