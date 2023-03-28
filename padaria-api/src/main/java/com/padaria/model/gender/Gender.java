package com.padaria.model.gender;

public enum Gender {

    Male("Masculino"),
    Female("Feminino");

    private final String description;

    Gender(String description) {
        this.description = description;
    }

    public String getValue() {
        return description;
    }

    @Override
    public String toString() {
        return description;
    }

}
