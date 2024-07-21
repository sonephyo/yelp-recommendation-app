package com.yelp_recommendation_app.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "businessInfo")
public class BusinessDto {
    private String id;
    private String name;
    private String latitude;
    private String longitude;
}
