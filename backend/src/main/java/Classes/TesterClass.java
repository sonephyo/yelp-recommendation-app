package Classes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;

import static Classes.CosineSimilarity.cosineSimilarity;
// TODO: Make a method that does this in Business Service 
public class TesterClass {

    public static void main(String[] args) throws IOException {
        String focus = "npuApKHyC6FbL8nGVxSQtg";
        String source = "ulwns2OavT81v6zG-Sk6ng";
        String destination = "JaHuWM3Tp1aG7NW66mhutw";
        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);
        HashMap<String, Double> similarityHashMap = cosineSimilarity(businessHashMap, focus);
        System.out.println(GraphHelper.createGraph(source, destination, businessHashMap, similarityHashMap));
    }
}
