package development_utils;

import Classes.Business;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.yelp_recommendation_app.backend.dto.BusinessDto;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

public class BusinessJSONExtract {

    public static void main(String[] args) {
        String fileName = "src/main/java/data/BusinessRawJSON";
        Gson gson = new Gson();
        HashMap<String, Business> tempBusinessMap = new HashMap<>();
        try (FileReader reader = new FileReader(fileName)) {
            Type type = new TypeToken<HashMap<String, BusinessDto>>() {
            }.getType();
            tempBusinessMap = gson.fromJson(reader, type);
            gson.toJson(tempBusinessMap, new FileWriter("src/main/java/data/BusinessNameLocationJSON"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
