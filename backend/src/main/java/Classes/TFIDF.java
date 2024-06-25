package Classes;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.*;
import java.util.*;

/*
By taking two JSON Files, it converts each business to the Business class and combines the info from the two files into one class.
The things stored are ID, Name, Longitude, Latitude, and Reviews, which are in two separate JSON files.
 */
public class TFIDF {
    private static HashMap<String, Business> mapOfBusiness;
    private static HashMap<String, Integer> termFrequencyAcrossCorpus = new HashMap<>();

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

        int index = 0;
        try {
            buffRead = new BufferedReader(new FileReader(reviewJSON));
            String line;
            while (index < mapOfBusiness.size()) {
                line = buffRead.readLine();
                JsonObject reviewJson = gson.fromJson(line, JsonObject.class);
                String id = String.valueOf(reviewJson.get("business_id")).substring(1, 23);
                String businessReview = String.join(" ", String.valueOf(reviewJson.get("text")).split("[^a-zA-Z0-9'&]+"));
                mapOfBusiness.get(id).setReview(businessReview);
                index++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        /*
        Removing business with null reviews
         */
        mapOfBusiness.values().removeIf(business -> business.getReview() == null);
        System.out.println("Business Reviews Added");


        termFrequency();
        inverseDocumentFrequency();
        computeTFIDF();
        System.out.println("TFIDF Computed");
        convertToJson();

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
     * The lower the number, the more common it is.
     */
    private static void setFrequencyTableAcrossCorpus() {
        for (Business business : mapOfBusiness.values()) {
            Set<String> uniqueWords = new HashSet<>(List.of(business.getReview().split("[^a-zA-Z0-9'&]+")));
            for (String word : uniqueWords) {
                if (termFrequencyAcrossCorpus.containsKey(word)) {
                    termFrequencyAcrossCorpus.put(word, termFrequencyAcrossCorpus.get(word) + 1);
                } else {
                    termFrequencyAcrossCorpus.put(word, 1);
                }
            }
        }
    }


    private static void inverseDocumentFrequency() {
        setFrequencyTableAcrossCorpus();
        int documentSize = termFrequencyAcrossCorpus.size();
        for (Business business : mapOfBusiness.values()) {
            HashMap<String, Double> idfTable = new HashMap<>();
            for (String word : business.getReview().split("[^a-zA-Z0-9'&]+")) {
                double idf = Math.log10(documentSize / (double) termFrequencyAcrossCorpus.get(word));
                idfTable.put(word, idf);
            }
            business.setInverseDocumentFrequency(idfTable);
        }
    }

    /*
    TFIDF is the measure of how important a word is to a set of documents. This determines all the importance of the words found in reviews.
    TFIDF = TF * IDF
     */
    private static void computeTFIDF() {
        for (Business business : mapOfBusiness.values()) {
            HashMap<String, Double> tfidf = new HashMap<>();
            HashMap<String, Double> termFrequencyTF = business.getTermFrequency();
            for (String term : termFrequencyTF.keySet()) {
                double tf = termFrequencyTF.get(term);
                double idf = termFrequencyAcrossCorpus.getOrDefault(term, 0);
                tfidf.put(term, tf * idf);
            }
            business.setTfidf(tfidf);
        }
    }

    /*
    Store the data locally so that it can be accessed by the controllers.
     */
    private static void convertToJson() {
        Gson gson = new Gson();
        String fileName = "BusinessJSON";
        try (FileWriter writer = new FileWriter(fileName)) {
            gson.toJson(mapOfBusiness, writer);
            System.out.println("HashMap saved as JSON file: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
