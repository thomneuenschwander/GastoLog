package io.github.thomneuenschwander.GastoLog.application.expense;

import java.time.LocalDateTime;


public record ExpenseResDTO(Long id, String description, String[] categories, Double price, LocalDateTime moment) {
    
}

