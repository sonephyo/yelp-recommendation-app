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
        System.out.println("Business Reviews Added");
        return mapOfBusiness;
    }

    private void tfidfCalculations() {
        HashMap<String, Integer> frequencyTable = new HashMap<>();
        for (Business business : mapOfBusiness.values()) {
            Set<String> uniqueWords = new HashSet<>(List.of(business.getReview().split("[^a-zA-Z0-9'&]+")));
            for (String word : uniqueWords) {
                if (frequencyTable.containsKey(word)) {
                    frequencyTable.put(word, frequencyTable.get(word) + 1);
                } else {
                    frequencyTable.put(word, 1);
                }
            }
        }

    }


}
