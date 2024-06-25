package Classes;

import lombok.Data;

import java.util.HashMap;

/*
* This is the business helper class: It will store all the required information regarding each Business.
 */
@Data
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