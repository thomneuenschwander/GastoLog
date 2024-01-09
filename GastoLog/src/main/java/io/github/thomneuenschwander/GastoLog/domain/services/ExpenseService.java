package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;

public interface ExpenseService {
    public List<Expense> findAllByClient(Long id) throws Exception;
}
