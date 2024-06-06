package Classes;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

/*
By taking two JSON Files, it converts each business to the Business class and combines the info from the two files into one class.
The things stored are ID, Name, Longitude, Latitude, and Reviews, which are in two separate JSON files.
 */
public class YelpFilter {
    private HashMap<String, Business> mapOfBusiness;

    public YelpFilter(File businessJSON, File reviewJSON) {
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
    }

}
