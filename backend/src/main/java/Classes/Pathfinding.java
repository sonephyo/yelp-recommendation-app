package Classes;

import java.util.HashMap;

public class Pathfinding {
    // Configuration for K-Means Clusters
    int TOTAL_CLUSTERS = 5;
    int MAX_ARRAY_SIZE = 2000;
    int TOTAL_CLUSTER_ITERATIONS = 100;

    /*
    By using the Haversine formula, we try to connect business to their closest 4 business.
     */
    public void geographicFilter(String businessID, HashMap<String, Business> mapOfBusiness) {
        HashMap<String, Double> closestBusiness = new HashMap<>();
        Business controlBusiness = mapOfBusiness.get(businessID);
        // int cluster = mapOfBusiness.get(businessID).getCluster();
        double latDistance = 0;
        double longDistance = 0;
        for (Business experimentBusiness : mapOfBusiness.values()) {
            double controlLat = controlBusiness.getLatitude();
            double controlLong = controlBusiness.getLongitude();
            double experimentLat = experimentBusiness.getLatitude();
            double experimentLong = experimentBusiness.getLongitude();

            latDistance = (controlLat - experimentLat) * (Math.PI / 180);
            longDistance = (controlLong - experimentLong) * (Math.PI / 180);
            controlLat = (controlLat) * (Math.PI / 180);
            experimentLat = (experimentLat) * (Math.PI / 180);

            double a = Math.pow(Math.sin(latDistance / 2), 2) +
                    Math.pow(Math.sin(longDistance / 2), 2) *
                            Math.cos(controlLat) * Math.cos(experimentLat);
            double rad = 6371;
            double c = 2 * Math.asin(Math.sqrt(a));
            double distance = c * rad;
            closestBusiness.put(experimentBusiness.getId(), distance);
        }
    }
}
