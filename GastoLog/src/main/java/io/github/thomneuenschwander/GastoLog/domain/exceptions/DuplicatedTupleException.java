package io.github.thomneuenschwander.GastoLog.domain.exceptions;

public class DuplicatedTupleException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public DuplicatedTupleException(String tuple, String entity){
        super("this "+ tuple + " has already been registered. "+entity+" cannot be persisted!");
    }
}
