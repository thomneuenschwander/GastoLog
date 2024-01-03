package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.Notebook;


public interface NotebookService {
    public Notebook findById(Long id) throws Exception;
    public List<Expense> findAll();
}
