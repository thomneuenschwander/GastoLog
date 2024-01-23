package io.github.thomneuenschwander.GastoLog.domain.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public CategoryNotFoundException(String categoryName){
        super("The category name -'"+categoryName+"'- does not exist.");
    }
}
