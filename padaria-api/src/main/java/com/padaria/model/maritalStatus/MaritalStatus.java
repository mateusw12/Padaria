package com.padaria.model.maritalStatus;

public enum MaritalStatus {

    None ("Nenhum"),
    Single("Solteiro"),
    Married("Casado"),
    Spouse("Cônjuge"),
    Divorced ("Divorciado"),
    Widowed ("Viúvo");

    private final String description;

    MaritalStatus(String description) {
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
