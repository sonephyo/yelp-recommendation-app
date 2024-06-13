package Classes;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/*
By taking two JSON Files, it converts each business to the Business class and combines the info from the two files into one class.
The things stored are ID, Name, Longitude, Latitude, and Reviews, which are in two separate JSON files.
 */
public class TFIDF {
    private static HashMap<String, Business> mapOfBusiness;

    public static HashMap<String, Business> tfidfCalculations(File businessJSON, File reviewJSON) {
        mapOfBusiness = new HashMap<>();
        Gson gson = new Gson();
        BufferedReader buffRead;

        try {
            buffRead = new BufferedReader(new FileReader(businessJSON));
            String line;
            while ((line = buffRead.readLine()) != null) {
                JsonObject business = gson.fromJson(line, JsonObject.class);
                String name = String.join(" ", String.valueOf(business.get("name")).split("[^a-zA-Z0-9'&]+")).substring(1);
                String id = String.valueOf(business.get("business_id")).substring(1, 23);
                double longitude = Double.parseDouble(String.valueOf(business.get("longitude")));
                double latitude = Double.parseDouble(String.valueOf(business.get("latitude")));
                mapOfBusiness.put(id, new Business(name, id, latitude, longitude));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Business Class Created");

        Set<String> uniqueBusiness = new HashSet<>();
        int index = 0;
        try {
            buffRead = new BufferedReader(new FileReader(reviewJSON));
            String line;
            while (uniqueBusiness.size() != mapOfBusiness.size()) {
                line = buffRead.readLine();
                JsonObject reviewJson = gson.fromJson(line, JsonObject.class);
                String id = String.valueOf(reviewJson.get("business_id")).substring(1, 23);
                String businessReview = String.join(" ", String.valueOf(reviewJson.get("text")).split("[^a-zA-Z0-9'&]+"));
                mapOfBusiness.get(id).setReview(businessReview);
                uniqueBusiness.add(id);
                index++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Business Reviews Added");
        termFrequency();
        inverseTermFrequency();
        return mapOfBusiness;
    }
    /*
    *  Finding Term Frequency: the number of times a word appears in a single review
    *  TF = [term count] / [size of each document]
    */
    private static void termFrequency() {

        for (Business business : mapOfBusiness.values()) {
            HashMap<String, Integer> termCount = new HashMap<>();
            HashMap<String, Double> termFrequencyTF = new HashMap<>();
            for (String word : business.getReview().split("[^a-zA-Z0-9'&]+")) {
                if (termCount.containsKey(word)) {
                    termCount.put(word, termCount.get(word) + 1);
                } else {
                    termCount.put(word, 1);
                }
            }
            for (String word : termCount.keySet()) {
                int term = termCount.get(word);
                int size = termCount.size();
                termFrequencyTF.put(word, (double) term / size);
                business.setTermFrequency(termFrequencyTF);
            }
        }
    }

    /*
    * Inverse Document Frequency: determine how rare or common a word is by seeing how many times it appears across the entire document
    * IDF = log ( [total number of documents in corpus] / [number of documents that contain term] );
     */
    private static void inverseTermFrequency() {
        HashMap<String, Integer> frequencyAcrossCorpus = new HashMap<>();
        for (Business business : mapOfBusiness.values()) {
            for (String term : ((List.of(business.getReview().split("[^a-zA-Z0-9'&]+"))))) {
                if (frequencyAcrossCorpus.containsKey(term)) {
                    frequencyAcrossCorpus.put(term, frequencyAcrossCorpus.get(term) + 1);
                } else {
                    frequencyAcrossCorpus.put(term, 1);
                }
            }
        }

        HashMap<String, Double> inverseTermFrequency = new HashMap<>();
        for (String term : frequencyAcrossCorpus.keySet()) {
            double count = frequencyAcrossCorpus.get(term);
            double idf = Math.log10(mapOfBusiness.size()/count);
            inverseTermFrequency.put(term, idf);
        }

        System.out.println(inverseTermFrequency);

    }


}
