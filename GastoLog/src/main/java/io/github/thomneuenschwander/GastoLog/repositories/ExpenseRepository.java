package io.github.thomneuenschwander.GastoLog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{
    
}
