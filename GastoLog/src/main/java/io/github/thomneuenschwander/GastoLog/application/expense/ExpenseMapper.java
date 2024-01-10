package io.github.thomneuenschwander.GastoLog.application.expense;

import java.util.Set;

import org.springframework.stereotype.Component;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;
import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;



@Component
public class ExpenseMapper {
    
    public Expense mapToExpense(ExpenseRequestDTO req){
        return new Expense(null, req.description(), req.price(), null, null);
    }
    
    public ExpenseResponseDTO expenseToResponseDTO(Expense exp){
        return new ExpenseResponseDTO(exp.getId(), exp.getDescription(), getCategories(exp.getCategories()), exp.getPrice(), exp.getMoment());
    }

    private String[] getCategories(Set<Category> list){
        return list.stream().map(Category::getName).toArray(String[]::new);
    }
}
