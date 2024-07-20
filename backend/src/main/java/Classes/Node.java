package Classes;

import java.util.ArrayList;
import java.util.Collection;

public class Node {
    String attribute;
    Collection<Node> links;
    Collection<Edge> edges;

    Node parent; // initially null
    double distance; // distance from source in Dijkstra's algorithm

    // Constructor
    Node(String attribute) {
        this.attribute = attribute;
        links = new ArrayList<>();
        edges = new ArrayList<>();
        parent = null;
        distance = Double.POSITIVE_INFINITY;
    }

    // Add a link to another node
    void addLink(Node node) {
        links.add(node);
    }

    // Add an edge to the node
    void addEdge(Edge edge) {
        edges.add(edge);
    }
}
