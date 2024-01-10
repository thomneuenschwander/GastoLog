package io.github.thomneuenschwander.GastoLog.application.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.application.user.UserServiceImpl;
import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.services.CategoryService;
import io.github.thomneuenschwander.GastoLog.domain.services.ExpenseService;
import io.github.thomneuenschwander.GastoLog.repositories.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService{

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CategoryService categoryService;

    @Override
    public List<Expense> findAllByClient(Long id) throws Exception {
        User user = userService.findById(id);
        return expenseRepository.findAllByClient(user);
    }

    @Override
    public Expense insert(Expense expense, Long id, String categoryName) throws Exception {
        var user = userService.findById(id);
        var category = categoryService.findByName(categoryName);
        expense.getCategories().add(category);
        expense.setClient(user);
        return expenseRepository.save(expense);
    }

    
    
}
