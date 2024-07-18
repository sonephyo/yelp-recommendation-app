package Classes;

import java.nio.file.Path;
import java.util.*;

public class Pathfinding {
    private ArrayList<Vertex> vertices;

    public Pathfinding() {
        this.vertices = new ArrayList<>();
    }

    public void createGraph(String businessID, HashMap<String, Business> mapOfBusiness, HashMap<String, Double> similarBusinessHashMap) {
        // NOTE TO SELF: Got the closest 1000 neighbors; index[0] = business itself
        String[] neighbors = new String[1000];
        int index = 0;
        for (String business : similarBusinessHashMap.keySet()) {
            neighbors[index] = business;
            index++;
            if (index >= 1000) {
                break;
            }
        }

        // Part 2: Find the distance between each of the neighbors
        HashMap<String, Double> neighborhoodMap = new HashMap<>();
        for (int i = 0; i < 1000; i++) {
            Business sourceBusiness = mapOfBusiness.get(neighbors[i]);
            for (int j = 0; j < 1000; j++) {
                if (j == i) {
                    continue;
                }
                Business destinationBusiness = mapOfBusiness.get(neighbors[j]);
                neighborhoodMap.put(destinationBusiness.getId(), haversine(sourceBusiness, destinationBusiness));
            }
            mapOfBusiness.get(neighbors[i]).setUnlinkedNeighboringBusiness(neighborhoodMap);
            neighborhoodMap.clear();
        }

        // Part 3: Find the closest 4 business and set it as the neighbors
        // NOTE: This might be a bit much. Debating weather to convert this into a parallel array of size 4.
        for (int i = 0; i < neighbors.length; i++) {
            mapOfBusiness.get(neighbors[i]).setNeighboringBusiness(
                    HashMapSorter.sortByValue(mapOfBusiness.get(neighbors[i]).getNeighboringBusiness())
            );
        }

        // Part 4: Create a graph
        Pathfinding path = new Pathfinding();
        for (int i = 0; i < neighbors.length; i++) {
            index = 0;
            Vertex origin = path.addVertex(neighbors[i]);
            for (String destinationID : mapOfBusiness.get(neighbors[i]).getNeighboringBusiness().keySet()) {
                Vertex destination = path.addVertex(destinationID);
                path.addEdge(origin, destination, mapOfBusiness.get(neighbors[i]).getNeighboringBusiness().get(destinationID));
                index++;
                if (index == 4) {
                    break;
                }
            }
        }

        //Part 5: Debug
//        for (int i = 0; i < 1000; i++) {
//            System.out.println(mapOfBusiness.get(neighbors[i]));
//        }
        path.print();
        System.out.println(dijkstra("rRPqeIfbthjR1VAP-eiu9A", "26P-CQEriE-BOvuiafpH1lOFKA"));
    }

    public List<String> dijkstra(String startID, String endID) {

        return null;
    }

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

            for (int i = 0; i < this.edges.size(); i++) {
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


