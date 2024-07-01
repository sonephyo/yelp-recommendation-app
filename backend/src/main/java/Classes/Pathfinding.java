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

    public Vertex addVertex(String businessID) {
        Vertex vertex = new Vertex(businessID);
        vertices.add(vertex);
        return vertex;
    }

    // distance - found using haversine formula
    public void addEdge(Vertex source, Vertex destination) {
        int distance = 0; // TEMP: TODO: Make it so you use the haversine formula to determine distance
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
    public void geographicFilter(String businessID, HashMap<String, Business> mapOfBusiness) {
        HashMap<String, Double> closestBusiness = new HashMap<>();
        ArrayList<String> neighbors = new ArrayList<>(mapOfBusiness.keySet());
        Collections.shuffle(neighbors);
        Business sourceBusiness = mapOfBusiness.get(businessID);
        double latDistance = 0;
        double longDistance = 0;
        double sourceLat = sourceBusiness.getLatitude();
        double sourceLong = sourceBusiness.getLongitude();
        for (int i = 0; i < 1000; i++) {
            double destinationLat = mapOfBusiness.get(neighbors.get(i)).getLatitude();
            double destinationLong = mapOfBusiness.get(neighbors.get(i)).getLongitude();

            latDistance = (sourceLat - destinationLat) * (Math.PI / 180);
            longDistance = (sourceLong - destinationLong) * (Math.PI / 180);
            sourceLat = (sourceLat) * (Math.PI / 180);
            destinationLat = (destinationLat) * (Math.PI / 180);

            double a = Math.pow(Math.sin(latDistance / 2), 2) +
                    Math.pow(Math.sin(longDistance / 2), 2) *
                            Math.cos(sourceLat) * Math.cos(destinationLat);
            double rad = 6371;
            double c = 2 * Math.asin(Math.sqrt(a));
            double distance = c * rad;
            closestBusiness.put(neighbors.get(i), distance);
        }
        mapOfBusiness.get(businessID).setNeighboringBusiness(closestBusiness);
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

        public void addEdge(Vertex destination, Integer distance) {
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
        private Integer distance;

        public Edge(Vertex root, Vertex destination, Integer distance) {
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

    }
}


