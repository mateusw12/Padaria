package com.padaria.exceptions;

public class EntityBadRequestException extends RuntimeException {

    public EntityBadRequestException(String msg){
        super(msg);
    }

}
