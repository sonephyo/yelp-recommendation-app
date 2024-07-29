package Classes;

import java.util.HashMap;
import java.util.Map;

/*
 * This class works with Graph.
 * Its purpose is to filter through the dataset and create a graph where all the nodes are connected to each other.
 */
public class GraphHelper {
    static int THRESHOLD = 20;

    /*
     * A path is made up of Nodes (business), edges (connection between business), and a graph which puts the whole thing together.
     */
    public static String createGraph(String sourceBusinessID, String destinationBusinessID, HashMap<String, Business> mapOfBusiness, HashMap<String, Double> similarBusinessHashMap) {
        HashMap<String, Node> nodeDataset = new HashMap<>();
        int index = 0;
        for (String business : similarBusinessHashMap.keySet()) {
            nodeDataset.put(business, new Node(business));
            index++;
            if (index >= 1500) break;
        }
       /*
       BUSINESS.setNeighboringBusiness = every business sorted by distance
       Finding the closest four business to each of the business.
       First you find the distance between every business, then you sort it.
       This sorts all 1000 business to each other by how close they are. 999 since we exclude the business itself.
        */
        HashMap<String, Double> neighborhoodMap = new HashMap<>();
        for (String hostBusiness : nodeDataset.keySet()) {
            Business sourceBusiness = mapOfBusiness.get(hostBusiness);
            for (String neighboringBusiness : nodeDataset.keySet()) {
//                if (neighboringBusiness.equals(hostBusiness)) {
//                    continue;
//                }
                Business destinationBusiness = mapOfBusiness.get(neighboringBusiness);
                neighborhoodMap.put(destinationBusiness.getId(), haversine(sourceBusiness, destinationBusiness));
            }
            mapOfBusiness.get(hostBusiness).setUnlinkedNeighboringBusiness(neighborhoodMap);
            neighborhoodMap.clear();
        }
        for (String business : nodeDataset.keySet()) {
            mapOfBusiness.get(business).setNeighboringBusiness(
                    HashMapSorter.sortSmallestToLargest(mapOfBusiness.get(business).getNeighboringBusiness())
            );
            mapOfBusiness.get(business).setNeighboringBusiness(
                    limitDataSet(mapOfBusiness.get(business).getNeighboringBusiness())
            );
        }

        for (String businessSTR : nodeDataset.keySet()) {
            Business sourceBusiness = mapOfBusiness.get(businessSTR);
            Edge[] edges = new Edge[4];
            int i = 0;
            for (String destinationBusiness : sourceBusiness.getNeighboringBusiness().keySet()) {
                if (i == 4) {
                    mapOfBusiness.get(businessSTR).setEdges(edges);
                    break;
                }
                edges[i] = new Edge(nodeDataset.get(businessSTR), nodeDataset.get(destinationBusiness), similarBusinessHashMap.get(destinationBusiness));
                i++;
            }
        }

        Graph graph = new Graph();
        for (Node node : nodeDataset.values()) {
            Business business = mapOfBusiness.get(node.attribute);
            for (int i = 0; i < 4; i++) {
                node.addEdge(business.getEdges()[i]);
            }
            graph.addNode(node);
        }

////        // DEBUG:
//        for (String id : nodeDataset.keySet()) {
//            String[] businessNeighbors = mapOfBusiness.get(id).getNeighboringBusiness().keySet().toArray(new String[0]);
//            String output = id + " --> ";
//            for (int i = 0; i < 5; i++) {
//                output += businessNeighbors[i] + "    ";
//            }
//            System.out.println(output);
//        }
        graph.dijkstra(nodeDataset.get(destinationBusinessID));
        mapOfBusiness.get(sourceBusinessID).setPath(graph.displayShortestPath(nodeDataset.get(sourceBusinessID)));

        JSONHelper.convertToJson(mapOfBusiness);
        return "test";
    }


    /*
     * Haversine formula is used to calculate the distance between each two geographical logications with the curve of the earth in mind.
     * This serves as the weight between the edge for two nodes.
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

    /**
     * Sets the amount of neighboring business to threshold
     *
     * @param neighboringBusiness: Given a map of x values, sets it equal to threshold
     * @return temp: Edits the original parameter so that it only stores 20 values
     */
    private static HashMap<String, Double> limitDataSet(HashMap<String, Double> neighboringBusiness) {
        HashMap<String, Double> temp = new HashMap<>();
        int index = 0;
        for (Map.Entry<String, Double> entry : neighboringBusiness.entrySet()) {
            if (index >= THRESHOLD) break;
            temp.put(entry.getKey(), entry.getValue());
            index++;
        }
        return HashMapSorter.sortSmallestToLargest(temp);
    }
}
