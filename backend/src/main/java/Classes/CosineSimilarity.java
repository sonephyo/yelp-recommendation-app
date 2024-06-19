package Classes;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/*
* Cosine similarity determines how similar two things are.
* By using the TFIDF values, we determine how similar every other business is when compared to the main business.
*
 */
public class CosineSimilarity {
        public static HashMap<String, Double> cosineSimilarity(HashMap<String, Business> mapOfBusiness, String sourceBusinessID) throws IOException {
            // Cosine Similarity = (vector a * vector b) / (sqrt(vectorA^2) sqrt(vectorB^2))
            Business userInput = mapOfBusiness.get(sourceBusinessID);
            HashMap<String, Double> similarBusinessScore = new HashMap<>();
            // Calculate the dot product
            for (Business business : mapOfBusiness.values()) {
                double dotProduct = 0.0;
                double userInputMagnitude = 0.0;
                double businessMagnitude = 0.0;
                for (String term : userInput.getTfidf().keySet()) {
                    double userInputTfIdf = userInput.getTfidf().getOrDefault(term, 0.0);
                    double businessTfIdf = business.getTfidf().getOrDefault(term, 0.0);
                    dotProduct += userInputTfIdf * businessTfIdf;
                    userInputMagnitude += Math.pow(userInputTfIdf, 2);
                    businessMagnitude += Math.pow(businessTfIdf, 2);
                }
                userInputMagnitude = Math.sqrt(userInputMagnitude);
                businessMagnitude = Math.sqrt(businessMagnitude);
                double cosineSimilarity = dotProduct / ((userInputMagnitude * businessMagnitude) + .000001);
                similarBusinessScore.put(business.getId(), cosineSimilarity);
            }
            System.out.println("Cosine Similarity Complete");
            return similarBusinessScore;
        }
}
