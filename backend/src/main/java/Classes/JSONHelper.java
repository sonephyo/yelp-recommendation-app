package Classes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;

public class JSONHelper {
    /**
     * Serialize file
     * @param mapOfBusiness: HashMap containing all the values created in this project
     * @return BusinessRawJSON: Returns a text file that is written onto the local device
     */
    public static void convertToJson(HashMap<String, Business> mapOfBusiness) {
        Gson gson = new Gson();
        String fileName = "./src/main/java/data/BusinessRawJSON";
        try (FileWriter writer = new FileWriter(fileName)) {
            gson.toJson(mapOfBusiness, writer);
            System.out.println("HashMap saved as JSON file: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
