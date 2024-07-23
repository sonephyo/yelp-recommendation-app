package Classes;

import com.google.gson.Gson;

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
        String fileName = "BusinessRawJSON";
        try (FileWriter writer = new FileWriter(fileName)) {
            gson.toJson(mapOfBusiness, writer);
            System.out.println("HashMap saved as JSON file: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void convertNeighborsToJson(HashMap<String, Business> mapOfBusiness) {
        Gson gson = new Gson();
        String fileName = "BusinessNeighborsSorted";
        try (FileWriter writer = new FileWriter(fileName)) {
            gson.toJson(mapOfBusiness, writer);
            System.out.println("HashMap saved as JSON file: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
