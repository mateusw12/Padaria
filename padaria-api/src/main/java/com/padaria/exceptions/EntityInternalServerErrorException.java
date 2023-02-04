package com.padaria.exceptions;

public class EntityInternalServerErrorException extends RuntimeException {

    public EntityInternalServerErrorException(String msg){
        super(msg);
    }

}
