package com.yelp_recommendation_app.backend.controller;

import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import com.yelp_recommendation_app.backend.service.BusinessService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class BusinessController {


    private BusinessService businessService;


    @GetMapping("/get-all-businesses")
    public List<BusinessDto> getAllBusinessNameLocation() {
        return businessService.get1000BusinessInfo();
    }

    @GetMapping("/get-business")
    public ResponseEntity<Optional<BusinessRawInfo>> getRawBusiness(@RequestParam String businessId) {
        return ResponseEntity.ok(businessService.getSpecificBusiness(businessId));
    }

    @GetMapping("/search-business")
    public ResponseEntity<List<BusinessRawInfo>> searchBusiness(@RequestParam String keyword) {
        return ResponseEntity.ok(businessService.getBusinessesStartingWith(keyword));
    }
}
