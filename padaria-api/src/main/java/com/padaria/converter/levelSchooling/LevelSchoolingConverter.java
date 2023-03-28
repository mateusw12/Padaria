package com.padaria.converter.levelSchooling;

import com.padaria.model.levelSchooling.LevelSchooling;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class LevelSchoolingConverter implements AttributeConverter<LevelSchooling, String> {

    @Override
    public String convertToDatabaseColumn(LevelSchooling levelSchooling) {
        if(levelSchooling == null){
            return null;
        }
        return levelSchooling.getValue();
    }

    @Override
    public LevelSchooling convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(LevelSchooling.values())
                .filter(el -> el.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
