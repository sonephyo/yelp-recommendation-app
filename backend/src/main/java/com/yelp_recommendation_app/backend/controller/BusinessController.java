package com.yelp_recommendation_app.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BusinessController {

    @GetMapping("/")
    public String hello() {
        return "hello";
    }


}
