package com.yelp_recommendation_app.backend.service;


import Classes.Business;
import Classes.Graph;
import Classes.GraphHelper;
import Classes.TFIDF;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

import static Classes.CosineSimilarity.cosineSimilarity;

@Service
public class BusinessService {
    HashMap<String, BusinessDto> tempBusinessMap = new HashMap<>();


    /**
     * Get All the business Data
     */
    public HashMap<String, BusinessDto> getAllBusinessesInfo() {
        String fileName = "src/main/java/data/BusinessNameLocationJSON";
        Gson gson = new Gson();
        try (FileReader reader = new FileReader(fileName)) {
            Type type = new TypeToken<HashMap<String, BusinessDto>>() {
            }.getType();
            tempBusinessMap = gson.fromJson(reader, type);

            //Returning all the hash data
            //return tempBusinessMap;

            HashMap<String, BusinessDto> testBusinessMap = new HashMap<>();
            int i = 0;
            for (String key : tempBusinessMap.keySet()) {
                if (i < 2000){
                    testBusinessMap.put(key, tempBusinessMap.get(key));
                }
                i++;
            }
            return testBusinessMap;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return tempBusinessMap;
    }


    /**
     * @param businessId - the id of the business
     * @return businessDto - the business that is related to the businessId
     * Note: the getAllBusinessesInfo need to be run before using the following method
     */
    public BusinessDto getSpecificBusiness(String businessId) {
        return tempBusinessMap.get(businessId);
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
