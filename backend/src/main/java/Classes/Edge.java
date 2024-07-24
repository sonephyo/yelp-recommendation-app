package Classes;

public class Edge implements Comparable<Edge> {
    Node src, dst;
    double weight;

    Edge(Node s, Node d, double w) {
        src = s;
        dst = d;
        weight = w;
    }

    // Compare based on edge weight
    public int compareTo(Edge e) {
        return Double.compare(weight, e.weight);
    }

    @Override
    public String toString() {
        return src.attribute + " --(" + weight + ")--> " + dst.attribute;
    }
}
