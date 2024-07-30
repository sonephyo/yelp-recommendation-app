package com.yelp_recommendation_app.backend.service;
import Classes.Business;
import Classes.GraphHelper;
import Classes.TFIDF;
import com.yelp_recommendation_app.backend.Models.BusinessRawInfo;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import com.yelp_recommendation_app.backend.repository.BusinessNameLocationRepository;
import com.yelp_recommendation_app.backend.repository.BusinessRawRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


import static Classes.CosineSimilarity.cosineSimilarity;

@Service
@AllArgsConstructor
public class BusinessService {

    private final BusinessNameLocationRepository businessNameLocationRepository;
    private final BusinessRawRepository businessRawRepository;

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
    public List<BusinessDto> get1000BusinessInfo() {
        List<BusinessDto> businessInfoList = businessNameLocationRepository.findAll();
        Collections.shuffle(businessInfoList);

        return businessInfoList.subList(0, 1000);
    }


    /**
     * @param businessId - the id of the business
     * @return businessDto - the business that is related to the businessId
     * Note: the getAllBusinessesInfo need to be run before using the following method
     */
    public Optional<BusinessRawInfo> getSpecificBusiness(String businessId) {
        return businessRawRepository.findByBusinessId(businessId);
    }
    public List<BusinessRawInfo> getBusinessesStartingWith(String keyword) {
        Optional<List<BusinessRawInfo>> searchResult =  businessRawRepository.findAllByNameStartingWith(keyword);
        if (searchResult.isPresent()) {
            List<BusinessRawInfo> searchResultList = searchResult.get();
            if (searchResultList.size() >20 ) {
                return searchResultList.subList(0, 20);
            } else {
                return searchResultList;
            }
        } return null;
    }

    /**
     * Creates mapOfBusiness that contains business class and the path between them.
     * @param sourceID
     * @param destinationID
     * @return output
     */
    public String runProgram(String sourceID, String destinationID) throws IOException {
        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);
        HashMap<String, Double> similarityHashMap = cosineSimilarity(businessHashMap, sourceID);
        String output = GraphHelper.createGraph(sourceID, destinationID, businessHashMap, similarityHashMap);
        return output;
    }
}
