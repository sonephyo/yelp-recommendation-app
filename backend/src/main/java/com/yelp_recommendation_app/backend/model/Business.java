package com.yelp_recommendation_app.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;

public class Business {
    private String name;
    private String id;
    private double latitude;
    private double longitude;
    private String review;
    private HashMap<String, Double> termFrequency;
    private HashMap<String, Double> inverseDocumentFrequency;
    private HashMap<String, Double> tfidf;

    public Business(String name, String id, double latitude, double longitude) {
        this.name = name;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
