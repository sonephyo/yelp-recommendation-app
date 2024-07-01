package com.yelp_recommendation_app.backend.controller;

import Classes.Business;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class BusinessController {
    private final HashMap<String, Business> mapOfBusiness;

    public BusinessController() {
        String fileName = "BusinessJSON";
        Gson gson = new Gson();
        HashMap<String, Business> tempBusinessMap = new HashMap<>();
        try (FileReader reader = new FileReader(fileName)) {
            Type type = new TypeToken<HashMap<String, Business>>() {
            }.getType();
            tempBusinessMap = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.mapOfBusiness = tempBusinessMap;
    }

    @GetMapping("/getMap")
    public HashMap<String, Business> getMap() {
        return mapOfBusiness;
    }

    @GetMapping("/get")
    public Business createProduct(final String businessID) {
        return mapOfBusiness.get(businessID);
    }


    //DEBUG:
//    @GetMapping("/getMap")
//    public HashMap<String, Business> getMap(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
//        return mapOfBusiness.entrySet()
//                .stream()
//                .skip(page * size)
//                .limit(size)
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, HashMap::new));
//    }

}
