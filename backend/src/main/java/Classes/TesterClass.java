package Classes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashMap;

public class TesterClass {

    public static void main(String[] args) throws FileNotFoundException {
        File businessJSON = new File("../../yelp_dataset/yelp_academic_dataset_business.json");
        File reviewJSON = new File("../../yelp_dataset/yelp_academic_dataset_review.json");
        HashMap<String, Business> businessHashMap = TFIDF.tfidfCalculations(businessJSON, reviewJSON);

    }
}
