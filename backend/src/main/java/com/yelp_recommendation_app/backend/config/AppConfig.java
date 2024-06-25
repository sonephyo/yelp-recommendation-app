package com.yelp_recommendation_app.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {

    @Bean
    public Map<String, Object> myHashMap() {
        return new HashMap<>();
    }
}
