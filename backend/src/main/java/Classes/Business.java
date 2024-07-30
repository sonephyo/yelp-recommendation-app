package Classes;

import lombok.Data;

import java.util.HashMap;
import java.util.List;

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
    private transient HashMap<String, Double> termFrequency;
//    private HashMap<String, Double> inverseDocumentFrequency;
    private transient HashMap<String, Double> tfidf;
    // Neighboring business is the 20 most similar business SORTED.
    private HashMap<String, Double> neighboringBusiness;
    // Stores the edge
    private transient Edge[] edges;
    // String contains the destinationID
    private String path;


    public Business(String name, String id, double latitude, double longitude) {
        this.name = name;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void setUnlinkedNeighboringBusiness(HashMap<String, Double> neighboringBusiness) {
        this.neighboringBusiness = new HashMap<>();
        for (String businessID : neighboringBusiness.keySet()) {
            this.neighboringBusiness.put(businessID, neighboringBusiness.get(businessID));
        }
    }

    @Override
    public String toString() {
        return "Business{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
//                ", review='" + review + '\'' +
//                ", termFrequency=" + termFrequency +
//                ", inverseDocumentFrequency=" + inverseDocumentFrequency +
//                ", tfidf=" + tfidf +
                ", neighboringBusiness=" + neighboringBusiness +
                '}';
    }
}