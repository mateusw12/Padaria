package com.padaria.model.levelSchooling;

public enum LevelSchooling {

    None  ("Nenhum"),
    IncompleteHigherEducation ("Enisno Médio Incompleto"),
    CompleteHigherEducation ("Enisno Médio Completo"),
    IncompleteSchoolLevel ("Ensino Superior Incompleto"),
    CompleteSchoolLevel ("Ensino Superior Completo"),
    PostGraduation ("Pós-Graduação");

    private final String description;

    LevelSchooling(String description) {
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
