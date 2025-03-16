package com.yelp_recommendation_app.backend.service;


import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import com.yelp_recommendation_app.backend.Models.BusinessTrainedRawModel;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import com.yelp_recommendation_app.backend.repository.BusinessNameLocationRepository;
import com.yelp_recommendation_app.backend.repository.BusinessRawRepository;
import com.yelp_recommendation_app.backend.repository.BusinessTrainedRawRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BusinessService {

    private final BusinessNameLocationRepository businessNameLocationRepository;
    private final BusinessRawRepository businessRawRepository;
    private final BusinessTrainedRawRepository businessTrainedRawRepository;

    /**
     * @return all BusinessInfo Data (id, Location, Lat, Long)
     */
    public List<BusinessDto> getAllBusinessesInfo() {
        return businessNameLocationRepository.findAll();
    }


    /**
     * For displaying the stores on the Google Map
     * @return 1000 random businessInfo
     */
    public List<BusinessTrainedRawModel> getTrainedBusinesses() {
        List<BusinessTrainedRawModel> businessInfoList = businessTrainedRawRepository.findAll();
        Collections.shuffle(businessInfoList);
        return businessInfoList;
    }


    /**
     * @param businessId - the id of the business
     * @return businessDto - the business that is related to the businessId
     * Note: the getAllBusinessesInfo need to be run before using the following method
     */
    public Optional<BusinessRawInfo> getSpecificBusiness(String businessId) {
        return businessRawRepository.findByBusinessId(businessId);
    }

    public Optional<BusinessTrainedRawModel> getSpecificBusinessTrained(String businessId) {
        return businessTrainedRawRepository.findByBusinessId(businessId);
    }

    public List<BusinessRawInfo> getBusinessesStartingWith(String keyword) {
        Optional<List<BusinessTrainedRawModel>> searchResult =  businessTrainedRawRepository.findAllByNameStartingWith(keyword);
        if (searchResult.isPresent()) {
            List<BusinessTrainedRawModel> searchResultList = searchResult.get();
            List<String> ids = searchResultList.stream()
                            .map(BusinessTrainedRawModel::getBusinessId)
                                    .toList();
            return businessRawRepository.findAllByBusinessIdIn(ids);
        } return null;
    }

    public List<BusinessRawInfo> getBusinessesOfIds(String[] businessIds) {
        return businessRawRepository.findAllByBusinessIdIn(List.of(businessIds));
    }

    public List<BusinessRawInfo> getRandomBusinesses() {
        return businessRawRepository.findRandomBusinesses();
    }

}
