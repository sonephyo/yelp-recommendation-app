package Classes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class TSP {
    // HashMap storing businesses with their names as keys
    HashMap<String, Business> businessHashMap = new HashMap<>();

    // Haversine distance function
    public static double haversine(Business source, Business destination) {
        double lon1 = source.getLongitude();
        double lon2 = destination.getLongitude();
        double lat1 = source.getLatitude();
        double lat2 = destination.getLatitude();
        final double R = 6371; // Earth radius in kilometers
        double dLon = Math.toRadians(lon2 - lon1);
        double dLat = Math.toRadians(lat2 - lat1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Business class
    static class Business {
        private double longitude;
        private double latitude;
        private String name;

        public Business(String name, double longitude, double latitude) {
            this.name = name;
            this.longitude = longitude;
            this.latitude = latitude;
        }

        public double getLongitude() {
            return longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public String getName() {
            return name;
        }

        @Override
        public String toString() {
            return "Business{" +
                    "name='" + name + '\'' +
                    ", longitude=" + longitude +
                    ", latitude=" + latitude +
                    '}';
        }
    }

    // Nearest Neighbor TSP algorithm
    public static List<Business> nearestNeighborTSP(HashMap<String, Business> businessMap) {
        List<Business> businesses = new ArrayList<>(businessMap.values());
        int numBusinesses = businesses.size();
        List<Business> path = new ArrayList<>();
        boolean[] visited = new boolean[numBusinesses];

        // Start from the first business
        Business currentBusiness = businesses.get(0);
        path.add(currentBusiness);
        visited[0] = true;

        for (int i = 1; i < numBusinesses; i++) {
            double minDistance = Double.MAX_VALUE;
            int nextBusinessIndex = -1;

            for (int j = 0; j < numBusinesses; j++) {
                if (!visited[j]) {
                    double distance = haversine(currentBusiness, businesses.get(j));
                    if (distance < minDistance) {
                        minDistance = distance;
                        nextBusinessIndex = j;
                    }
                }
            }

            currentBusiness = businesses.get(nextBusinessIndex);
            path.add(currentBusiness);
            visited[nextBusinessIndex] = true;
        }

        // Return to the starting point
        path.add(businesses.get(0));

        return path;
    }

    public static void main(String[] args) {
        TSP tsp = new TSP();

        // Assuming businessHashMap is already filled with 10,000 businesses
        // Example of filling it with random businesses
        for (int i = 0; i < 10000; i++) {
            String name = "Business" + i;
            double longitude = Math.random() * 360 - 180;
            double latitude = Math.random() * 180 - 90;
            tsp.businessHashMap.put(name, new Business(name, longitude, latitude));
        }

        // Compute the TSP path
        long startTime = System.currentTimeMillis();
        List<Business> path = nearestNeighborTSP(tsp.businessHashMap);
        long endTime = System.currentTimeMillis();

        // Print the path and the time taken
        for (Business business : path) {
            System.out.println(business);
        }
        System.out.println("Time taken: " + (endTime - startTime) + " ms");
    }
}
