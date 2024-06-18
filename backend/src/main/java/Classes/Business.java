package Classes;

import java.util.HashMap;

/*
* This is the business helper class: It will store all the required information regarding each Business.
 */
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

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getReview() {return review; }

    public void setReview(String review) { this.review = review; }

    public void setTermFrequency(HashMap<String, Double> termFrequency) { this.termFrequency = termFrequency; }

    public HashMap<String, Double> getTermFrequency() {
        return termFrequency;
    }

    public void setTfidf(HashMap<String, Double> tfidf) {
        this.tfidf = tfidf;
    }

    public HashMap<String, Double> getInverseDocumentFrequency() {
        return inverseDocumentFrequency;
    }

    public void setInverseDocumentFrequency(HashMap<String, Double> inverseDocumentFrequency) {
        this.inverseDocumentFrequency = inverseDocumentFrequency;
    }
}
