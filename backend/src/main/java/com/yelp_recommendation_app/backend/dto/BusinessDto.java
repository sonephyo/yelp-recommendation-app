package com.yelp_recommendation_app.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "businessNameLocation")
public class BusinessDto {
    private String businessId;
    private String name;
    private String latitude;
    private String longitude;
}
