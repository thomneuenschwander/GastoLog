package io.github.thomneuenschwander.GastoLog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{
    List<Expense> findAllByClient(User user);
}
