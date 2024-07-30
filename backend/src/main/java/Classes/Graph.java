package Classes;

import java.util.*;

public class Graph {
    Collection<Node> nodes;
    Graph() {
        nodes = new ArrayList<>();
    }

    void clearParentsAndDistances() {
        nodes.forEach(s -> {
            s.parent = null;
            s.distance = Double.POSITIVE_INFINITY;
        });
    }
    void addNode(Node node) {
        nodes.add(node);
    }

    // Dijkstra's algorithm for shortest paths from a source node: Credit to Doug Lea for the skeleton.
    void dijkstra(Node source) {
        clearParentsAndDistances();
        source.distance = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingDouble(node -> node.distance));
        pq.add(source);

        while (!pq.isEmpty()) {
            Node u = pq.poll();

            for (Edge edge : u.edges) {
                Node v = edge.dst;
                double weight = edge.weight;
                double distanceThroughU = u.distance + weight;

                if (distanceThroughU < v.distance) {
                    pq.remove(v); // Remove the node if it's already in the priority queue
                    v.distance = distanceThroughU;
                    v.parent = u;
                    pq.add(v);
                }
            }
        }
    }
    String displayShortestPath(Node destination) {
        List<Node> path = new ArrayList<>();
        double totalWeight = destination.distance;
        for (Node at = destination; at != null; at = at.parent) {
            path.add(at);
        }
        Collections.reverse(path);

        String output = "Path: ";
        for (int i = 0; i < path.size(); i++) {
            output += (path.get(i).attribute);
            if (i < path.size() - 1) {
                System.out.print(" -> ");
            }
        }
        System.out.println(output);
        System.out.println("Total Weight: " + totalWeight);
        return output;
    }
}
