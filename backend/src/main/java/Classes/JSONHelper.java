package Classes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;

public class JSONHelper {
    // Stack Overflow Error - size too big.
    /*
     * Store the data locally so that it can be accessed by the controllers.
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
