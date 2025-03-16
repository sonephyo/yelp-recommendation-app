package com.yelp_recommendation_app.backend.repository;

import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRawRepository extends MongoRepository<BusinessRawInfo, String> {

    Optional<BusinessRawInfo> findByBusinessId(String businessId);
    Optional<BusinessRawInfo> findByName(String name);
    List<BusinessRawInfo> findAllByBusinessIdIn(Collection<String> businessId);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    Optional<List<BusinessRawInfo>> findAllByNameStartingWith(String name);

    @Aggregation("{ $sample: { size: 20 } }")
    List<BusinessRawInfo> findRandomBusinesses();
}
