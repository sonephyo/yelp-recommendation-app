package com.yelp_recommendation_app.backend.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "businessTrainedRaw")
@AllArgsConstructor
@Data
public class BusinessTrainedRawModel {

    @Id
    private String _id;
    @Field("businessId")
    private String businessId;
    private String name;
    private String latitude;
    private String longitude;
    private HashMap<String, Double> neighboringBusiness;

}
