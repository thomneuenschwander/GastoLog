package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;

public interface ExpenseService {
    public Expense findOneByClient(Long id, String email);
    public List<Expense> findAllByClient(String email) throws Exception;
    public Expense insert(Expense exp, String email, String[] categories) throws Exception;
    public Expense update(Expense exp, Long id, String email);
    public void delete (Long expId, String email) throws Exception;
}
