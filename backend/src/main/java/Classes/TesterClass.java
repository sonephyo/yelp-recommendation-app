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
        cosineSimilarity(businessHashMap, "smRQA9crZ6SwUrLATMSVPg");

        Pathfinding businessPath = new Pathfinding();
        Pathfinding path2 = businessPath.createGraph("smRQA9crZ6SwUrLATMSVPg", businessHashMap);
        path2.print();


//        Pathfinding pathfinder = new Pathfinding();
//        Pathfinding.Vertex vertex1 = pathfinder.addVertex("womp");
//        Pathfinding.Vertex vertex2 = pathfinder.addVertex("pomw");
//        Pathfinding.Vertex vertex3 = pathfinder.addVertex("pompwomp");
//
//        pathfinder.addEdge(vertex1, vertex2, 5.0);
//        pathfinder.addEdge(vertex2, vertex3, 4.0);
//        pathfinder.print();
    }
}
