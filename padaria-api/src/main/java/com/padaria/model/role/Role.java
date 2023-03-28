package com.padaria.model.role;

public enum Role {

    None("Nenhum"),
    Adm("Administrador"),
    Employee ("Funcionário"),
    Manager("Gestor");

    private final String description;

    Role(String description) {
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
