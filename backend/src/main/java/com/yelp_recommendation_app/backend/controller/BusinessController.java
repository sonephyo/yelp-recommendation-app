package com.yelp_recommendation_app.backend.controller;

import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import com.yelp_recommendation_app.backend.Models.BusinessTrainedRawModel;
import com.yelp_recommendation_app.backend.dto.BusinessIDsRequest;
import com.yelp_recommendation_app.backend.service.BusinessService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class BusinessController {


    private BusinessService businessService;


    @GetMapping("/get-all-businesses")
    public List<BusinessTrainedRawModel> getAllBusinessNameLocation() {
        return businessService.getTrainedBusinesses();
    }

    @GetMapping("/get-business")
    public ResponseEntity<Optional<BusinessRawInfo>> getRawBusiness(@RequestParam String businessId) {
        return ResponseEntity.ok(businessService.getSpecificBusiness(businessId));
    }


    @GetMapping("/get-trained-business")
    public ResponseEntity<Optional<BusinessTrainedRawModel>> getRawBusinessTrained(@RequestParam String businessId) {
        return ResponseEntity.ok(businessService.getSpecificBusinessTrained(businessId));
    }

    @GetMapping("/get-businesses-of-ids")
    public ResponseEntity<List<BusinessRawInfo>> getRawBusinessTrained(@RequestParam(value = "id[]") String[] businessIdsRequest) {
        ResponseEntity<List<BusinessRawInfo>> data =  ResponseEntity.ok(businessService.getBusinessesOfIds(businessIdsRequest));

        return data;
    }

    @GetMapping("/search-business")
    public ResponseEntity<List<BusinessRawInfo>> searchBusiness(@RequestParam String keyword) {
        return ResponseEntity.ok(businessService.getBusinessesStartingWith(keyword));
    }

    @GetMapping("/get-random-businesses")
    public ResponseEntity<List<BusinessRawInfo>> getRandomBusiness() {
        return ResponseEntity.ok(businessService.getRandomBusinesses());
    }
}
