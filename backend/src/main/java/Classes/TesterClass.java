package Classes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

import static Classes.CosineSimilarity.cosineSimilarity;

public class TesterClass {

    public static void main(String[] args) throws IOException {
        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);
        cosineSimilarity(businessHashMap, "smRQA9crZ6SwUrLATMSVPg");
    }
}
