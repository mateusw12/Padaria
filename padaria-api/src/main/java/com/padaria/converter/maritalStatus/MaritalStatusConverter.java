package com.padaria.converter.maritalStatus;

import com.padaria.model.maritalStatus.MaritalStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class MaritalStatusConverter implements AttributeConverter<MaritalStatus, String> {

    @Override
    public String convertToDatabaseColumn(MaritalStatus maritalStatus) {
        if(maritalStatus == null){
            return null;
        }
        return maritalStatus.getValue();
    }

    @Override
    public MaritalStatus convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(MaritalStatus.values())
                .filter(el -> el.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
