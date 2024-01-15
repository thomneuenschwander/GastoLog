package io.github.thomneuenschwander.GastoLog.application.expense;

public record ExpenseReqDTO(String description, Double price, String[] categories) {
    
}
