package Classes;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class CosineSimilarity {

//
//        private static HashMap<String, Business> cosineSimilarity(String businessID) throws IOException {
//            // Cosine Similarity = (vector a * vector b) / (sqrt(vectorA^2) sqrt(vectorB^2))
//            Business userInput = mapOfBusiness.get(businessID);
//            HashMap<String, Double> similarityScores = new HashMap<>();
//            HashMap<String, Double> output = new HashMap<>();
//            // Calculate the dot product
//            for (Business business : mapOfBusiness.values()) {
//                double dotProduct = 0.0;
//                double userInputMagnitude = 0.0;
//                double businessMagnitude = 0.0;
//                for (String term : userInput.getTfIDF().keySet()) {
//                    double userInputTfIdf = userInput.getTfIDF().getOrDefault(term, 0.0);
//                    double businessTfIdf = business.getTfIDF().getOrDefault(term, 0.0);
//                    dotProduct += userInputTfIdf * businessTfIdf;
//                    userInputMagnitude += Math.pow(userInputTfIdf, 2);
//                    businessMagnitude += Math.pow(businessTfIdf, 2);
//                }
//                userInputMagnitude = Math.sqrt(userInputMagnitude);
//                businessMagnitude = Math.sqrt(businessMagnitude);
//                // Add an insignificant value to prevent NaN
//                double cosineSimilarity = dotProduct / ((userInputMagnitude * businessMagnitude) + .000001);
//                similarityScores.put(business.getId(), cosineSimilarity);
//                business.setSimilarityValue(cosineSimilarity);
//            }
//            // Sort the similarity scores
//            HashMap<String, Double> scoresWithName = new HashMap<>();
//            for (String id : similarityScores.keySet()) {
//                mapOfBusiness.get(id).setSimilarityValue(similarityScores.get(id));
//                String name = businessNames.get(mapOfBusiness.get(id).getId());
//                scoresWithName.put(name, similarityScores.get(id));
//            }
//            sortedScores = new ArrayList<>(scoresWithName.entrySet());
//            sortedScores.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));
//            findKMeans();
//            geographicCluster(businessID);
//            return mapOfBusiness;
//        }
}
