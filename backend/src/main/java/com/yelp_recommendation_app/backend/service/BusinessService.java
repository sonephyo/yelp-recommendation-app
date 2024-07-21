package com.yelp_recommendation_app.backend.service;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import com.yelp_recommendation_app.backend.repository.BusinessRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BusinessService {

    private final BusinessRepository  businessRepository;

    /**
     * @return all BusinessInfo Data (id, Location, Lat, Long)
     */
    public List<BusinessDto> getAllBusinessesInfo() {
        return businessRepository.findAll();
    }


    /**
     * For displaying the stores on the Google Map
     * @return 1000 random businessInfo
     */
    public List<BusinessDto> get1000BusinessInfo() {
        List<BusinessDto> businessInfoList = businessRepository.findAll();
        Collections.shuffle(businessInfoList);

        return businessInfoList.subList(0, 1000);
    }


    /**
     * @param businessId - the id of the business
     * @return businessDto - the business that is related to the businessId
     * Note: the getAllBusinessesInfo need to be run before using the following method
     */
    public Optional<BusinessDto> getSpecificBusiness(String businessId) {
        return businessRepository.findById(businessId);
    }
}
