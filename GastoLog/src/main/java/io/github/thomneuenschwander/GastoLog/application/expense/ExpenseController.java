package io.github.thomneuenschwander.GastoLog.application.expense;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/expense")
public class ExpenseController {
    
    @Autowired
    private ExpenseServiceImpl expenseService;

    @Autowired
    private ExpenseMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResDTO>findOneByClient(@PathVariable Long id, Principal auth){
        var expense = expenseService.findOneByClient(id, auth.getName());
        var res = mapper.expenseToResponseDTO(expense);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExpenseResDTO>> findAllByClient(Principal auth) throws Exception{
        var list = expenseService.findAllByClient(auth.getName());
        var dto = list.stream().map(exp -> mapper.expenseToResponseDTO(exp)).collect(Collectors.toList());
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/add")
    public ResponseEntity<ExpenseResDTO> insert(@RequestBody ExpenseReqDTO reqDTO, Principal auth) throws Exception {
        var expense = mapper.mapToExpense(reqDTO);
        var res = expenseService.insert(expense, auth.getName(), reqDTO.categories());
        var dto = mapper.expenseToResponseDTO(res);

        return ResponseEntity.ok().body(dto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ExpenseResDTO> putMethodName(@PathVariable Long id, @RequestBody ExpenseReqDTO reqDTO, Principal auth) {
        var expense = mapper.mapToExpense(reqDTO);
        var res = expenseService.update(expense, id, auth.getName());
        var dto = mapper.expenseToResponseDTO(res);
        return ResponseEntity.ok().body(dto);
    }
    
    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Principal auth){
        expenseService.delete(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
