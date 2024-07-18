package Classes;

public class TesterClass {
    public static void main(String[] args) {
        // Create nodes
        Node nodeA = new Node(1);
        Node nodeB = new Node(2);
        Node nodeC = new Node(3);
        Node nodeD = new Node(4);
        Node nodeE = new Node(5);
        Node nodeF = new Node(6);

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
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addNode(nodeC);
        graph.addNode(nodeD);
        graph.addNode(nodeE);
        graph.addNode(nodeF);

        // Run Dijkstra's algorithm from nodeA
        graph.dijkstra(nodeA);

        // Display the shortest path from nodeA to nodeF
        graph.displayShortestPath(nodeF);
    }
}
