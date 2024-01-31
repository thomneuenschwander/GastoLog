package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;

public interface ExpenseService {

    Expense findOneByClient(Long id, String email);

    List<Expense> findAllByClient(String email) throws Exception;

    Expense insert(Expense exp, String email, String[] categories) throws Exception;

    Expense update(Expense exp, Long id, String email, String[] categories);

    void delete (Long expId, String email) throws Exception;

    List<Expense> search(String name, Double price, String email);
}
