package Classes;

import java.lang.reflect.Array;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

public class Pathfinding {
    private ArrayList<Vertex> vertices;

    public Pathfinding() {
        this.vertices = new ArrayList<>();
    }

    public Pathfinding createGraph(String businessID, HashMap<String, Business> mapOfBusiness, HashMap<String, Double> similarBusinessHashMap) {
        String[] neighbors = similarBusinessHashMap.keySet().toArray(new String[1000]);
        HashMap<String, Double> listOfLocations = geographicFilter(businessID, mapOfBusiness, neighbors);
        Pathfinding path = new Pathfinding();
        Vertex originVertex = path.addVertex(businessID);
        for (String destinationBusinessID : listOfLocations.keySet()) {
            Vertex destinationVertex = path.addVertex(destinationBusinessID);
            path.addEdge(originVertex, destinationVertex, listOfLocations.get(destinationBusinessID));
        }
        return path;
    }

    /*
    For each of the 1000 business,find the four closest ones and connect it together.
     */
    private void createNeighboringPaths(String source, HashMap<String, Business> mapOfBusiness) {

    }

    public Vertex addVertex(String businessID) {
        Vertex vertex = new Vertex(businessID);
        vertices.add(vertex);
        return vertex;
    }

    // distance - found using haversine formula
    public void addEdge(Vertex source, Vertex destination, double distance) {
        source.addEdge(destination, distance);
        destination.addEdge(source, distance);
    }

    public void removeVertex(Vertex vertex) {
        this.vertices.remove(vertex);
    }

    public void print() {
        for (Vertex v : vertices) {
            v.print();
        }
    }

    /*
    We collect 1000 random business that are connected to the root business.
    We find their distance from the root.
     */
    public HashMap<String, Double> geographicFilter(String businessID, HashMap<String, Business> mapOfBusiness, String[] neighbors) {
        HashMap<String, Double> closestBusiness = new HashMap<>();
        Business sourceBusiness = mapOfBusiness.get(businessID);
        double latDistance = 0;
        double longDistance = 0;
        double sourceLat = sourceBusiness.getLatitude();
        double sourceLong = sourceBusiness.getLongitude();
        for (int i = 0; i < 1000; i++) {
            double destinationLat = mapOfBusiness.get(neighbors[i]).getLatitude();
            double destinationLong = mapOfBusiness.get(neighbors[i]).getLongitude();

            latDistance = (sourceLat - destinationLat) * (Math.PI / 180);
            longDistance = (sourceLong - destinationLong) * (Math.PI / 180);
            sourceLat = (sourceLat) * (Math.PI / 180);
            destinationLat = (destinationLat) * (Math.PI / 180);

            double a = Math.pow(Math.sin(latDistance / 2), 2) +
                    Math.pow(Math.sin(longDistance / 2), 2) *
                            Math.cos(sourceLat) * Math.cos(destinationLat);
            final double rad = 6371;
            double c = 2 * Math.asin(Math.sqrt(a));
            double distance = c * rad;
            closestBusiness.put(neighbors[i], distance);
        }
        return closestBusiness;
    }

    /*
    Recursion for neighbors: Connect every business to each other
     */

    /*
    Haversine distance between two business. Same concept as geographic filter, but more abstract.
     */
    public static double haversine(Business source, Business destination) {
        double lon1 = source.getLongitude();
        double lon2 = destination.getLongitude();
        double lat1 = source.getLatitude();
        double lat2 = destination.getLatitude();
        final double R = 6371;
        double dLon = Math.toRadians(lon2 - lon1);
        double dLat = Math.toRadians(lat2 - lat1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }


    /*
    Helper Classes
     */
    static class Vertex {
        private String businessID;
        private ArrayList<Edge> edges;

        public Vertex(String businessID) {
            this.businessID = businessID;
            this.edges = new ArrayList<Edge>();
        }

        public void addEdge(Vertex destination, double distance) {
            this.edges.add(new Edge(this, destination, distance));
        }

        public void print() {
            String message = "";

            if (this.edges.size() == 0) {
                System.out.println(this.businessID + " -->");
                return;
            }

            for(int i = 0; i < this.edges.size(); i++) {
                if (i == 0) {
                    message += this.edges.get(i).getRoot().businessID + " -->  ";
                }

                message += this.edges.get(i).getDestination().businessID;

                message += " (" + this.edges.get(i).getDistance() + ")";


                if (i != this.edges.size() - 1) {
                    message += ", ";
                }
            }
            System.out.println(message);
        }
    }

    static class Edge {
        private Vertex root;
        private Vertex destination;
        private double distance;

        public Edge(Vertex root, Vertex destination, double distance) {
            this.root = root;
            this.destination = destination;
            this.distance = distance;
        }

        public Vertex getRoot() {
            return root;
        }

        public Vertex getDestination() {
            return destination;
        }

        public double getDistance() {
            return distance;
        }
    }
}


