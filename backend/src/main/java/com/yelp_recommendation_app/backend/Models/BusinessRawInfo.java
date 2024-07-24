package com.yelp_recommendation_app.backend.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "businessRaw")
@AllArgsConstructor
@Data
public class BusinessRawInfo {

    @Id
    private String _id;
    private String businessId;
    private String name;
    private String address;
    private String city;
    private String state;
    private String postal_code;
    private double latitude;
    private double longitude;
    private int stars;
    private int review_count;
    private int is_open;
    private Map<String, String> attributes;
    private String categories;
    private Map<String, String> hours;

}
