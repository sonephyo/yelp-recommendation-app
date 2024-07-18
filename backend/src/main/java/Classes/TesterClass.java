package Classes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;

import static Classes.CosineSimilarity.cosineSimilarity;

public class TesterClass {

    public static void main(String[] args) throws IOException {
        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);
        HashMap<String, Double> similarityHashMap = cosineSimilarity(businessHashMap, "smRQA9crZ6SwUrLATMSVPg");

//        Pathfinding businessPath = new Pathfinding();
//        Pathfinding path2 = businessPath.createGraph("smRQA9crZ6SwUrLATMSVPg", businessHashMap, similarityHashMap);
//        path2.print();
//        businessPath.createGraph("smRQA9crZ6SwUrLATMSVPg", businessHashMap, similarityHashMap);

//        Pathfinding pathfinder = new Pathfinding();
//        Pathfinding.Vertex vertex1 = pathfinder.addVertex("womp");
//        Pathfinding.Vertex vertex2 = pathfinder.addVertex("pomw");
//        Pathfinding.Vertex vertex3 = pathfinder.addVertex("pompwomp");
//
//        pathfinder.addEdge(vertex1, vertex2, 5.0);
//        pathfinder.addEdge(vertex2, vertex3, 4.0);
//        pathfinder.print();

        // Create nodes
        Node nodeA = new Node(1);
        Node nodeB = new Node(2);
        Node nodeC = new Node(3);
        Node nodeD = new Node(4);
        Node nodeE = new Node(5);
        Node nodeF = new Node(6);

        // Add links between nodes (for path checking)
        nodeA.addLink(nodeB);
        nodeB.addLink(nodeC);
        nodeC.addLink(nodeD);
        nodeD.addLink(nodeE);
        nodeE.addLink(nodeF);
        nodeA.addLink(nodeC);
        nodeB.addLink(nodeD);
        nodeC.addLink(nodeE);
        nodeD.addLink(nodeF);

        // Create edges with weights and add them to nodes
        Edge edgeAB = new Edge(nodeA, nodeB, 1.0);
        Edge edgeBC = new Edge(nodeB, nodeC, 2.0);
        Edge edgeCD = new Edge(nodeC, nodeD, 3.0);
        Edge edgeDE = new Edge(nodeD, nodeE, 4.0);
        Edge edgeEF = new Edge(nodeE, nodeF, 5.0);
        Edge edgeAC = new Edge(nodeA, nodeC, 2.5);
        Edge edgeBD = new Edge(nodeB, nodeD, 3.5);
        Edge edgeCE = new Edge(nodeC, nodeE, 4.5);
        Edge edgeDF = new Edge(nodeD, nodeF, 6.0);

        nodeA.addEdge(edgeAB);
        nodeB.addEdge(edgeBC);
        nodeC.addEdge(edgeCD);
        nodeD.addEdge(edgeDE);
        nodeE.addEdge(edgeEF);
        nodeA.addEdge(edgeAC);
        nodeB.addEdge(edgeBD);
        nodeC.addEdge(edgeCE);
        nodeD.addEdge(edgeDF);

        // Create graph and add nodes
        Graph graph = new Graph();

    }
}
