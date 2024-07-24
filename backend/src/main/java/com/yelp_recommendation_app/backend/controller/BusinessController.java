package com.yelp_recommendation_app.backend.controller;

import Classes.Business;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.yelp_recommendation_app.backend.dto.BusinessDto;
import com.yelp_recommendation_app.backend.service.BusinessService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class BusinessController {


    private BusinessService businessService;


    @GetMapping("/getMap")
    public HashMap<String, BusinessDto> getMap() {
        return businessService.getAllBusinessesInfo();
    }

    @PostMapping("/getBusiness")
    public BusinessDto createProduct(@RequestBody HashMap<String, String> data) {
        return businessService.getSpecificBusiness(data.get("businessId"));
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
