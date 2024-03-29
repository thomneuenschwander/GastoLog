package io.github.thomneuenschwander.GastoLog.application.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.application.user.UserServiceImpl;
import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ResourceNotFoundException;
import io.github.thomneuenschwander.GastoLog.domain.services.CategoryService;
import io.github.thomneuenschwander.GastoLog.domain.services.ExpenseService;
import io.github.thomneuenschwander.GastoLog.repositories.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CategoryService categoryService;

    @Override
    public Expense findOneByClient(Long id, String email) {
        var user = userService.findByEmail(email);
        var expenseO = expenseRepository.findByIdAndClient(id, user);
        return expenseO.orElseThrow(() -> new ResourceNotFoundException(email));
    }

    @Override
    public List<Expense> findAllByClient(String email) throws Exception {
        var user = userService.findByEmail(email);
        return expenseRepository.findAllByClient(user);
    }

    @Override
    public Expense insert(Expense expense, String email, String[] categories) throws Exception {
        addCategories(expense, categories);
        var user = userService.findByEmail(email);
        expense.setClient(user);
        return expenseRepository.save(expense);
    }
    private void addCategories(Expense expense, String[] categories){
        if (categories != null) {
            for (String categoryName : categories) {
                var category = categoryService.findByName(categoryName);
                expense.getCategories().add(category);
            }
        }
    }

    @Override
    public Expense update(Expense exp, Long id, String email, String[] categories) {
        var user = userService.findByEmail(email);
        var expenseO = expenseRepository.findByIdAndClient(id, user);
        if (!expenseO.isPresent()) {
            throw new ResourceNotFoundException(id);
        }
        updateData(expenseO.get(), exp, categories);
        return expenseRepository.save(expenseO.get());
    }

    private void updateData(Expense prevExp, Expense exp, String[] newCategories) {
        prevExp.setDescription(exp.getDescription());
        prevExp.setPrice(exp.getPrice());
        prevExp.getCategories().clear();
        addCategories(prevExp, newCategories);
    }

    @Override
    public void delete(Long id, String email) {
        var user = userService.findByEmail(email);
        try {
            expenseRepository.deleteByIdAndClient(id, user);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    @Override
    public List<Expense> search(String name, Double price, String email) {
        var id = userService.findByEmail(email).getId();
        return expenseRepository.findByNameLikeAndPriceGreaterAndUserId(name, price, id);
    }

}
