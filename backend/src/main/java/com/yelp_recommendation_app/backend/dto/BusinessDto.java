package com.yelp_recommendation_app.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BusinessDto {
    private String id;
    private String name;
    private String latitude;
    private String longitude;
}
