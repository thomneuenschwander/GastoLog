package io.github.thomneuenschwander.GastoLog.application.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    
    @Autowired
    private ExpenseServiceImpl expenseService;

    @GetMapping("/u/{id}")
    public ResponseEntity<List<Expense>> findAllByClient(@PathVariable Long id) throws Exception{
        List<Expense> list = expenseService.findAllByClient(id);
        return ResponseEntity.ok().body(list);
    }
}
