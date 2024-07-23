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
        String testBusinessID = "smRQA9crZ6SwUrLATMSVPg";

        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);
        HashMap<String, Double> similarityHashMap = cosineSimilarity(businessHashMap, testBusinessID);
        Graph graph = GraphHelper.createGraph(testBusinessID, businessHashMap, similarityHashMap);

}
}
