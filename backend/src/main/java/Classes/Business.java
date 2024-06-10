package Classes;
/*
* This is the business helper class: It will store all the required information regarding each Business.
 */
public class Business {
    private String name;
    private String id;
    private double latitude;
    private double longitude;
    private String review;

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

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
