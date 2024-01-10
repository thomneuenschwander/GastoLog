package io.github.thomneuenschwander.GastoLog.application.expense;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/expense")
public class ExpenseController {
    
    @Autowired
    private ExpenseServiceImpl expenseService;

    @Autowired
    private ExpenseMapper mapper;

    @GetMapping("/u/{id}")
    public ResponseEntity<List<ExpenseResDTO>> findAllByClient(@PathVariable Long id) throws Exception{
        var list = expenseService.findAllByClient(id);
        var dto = list.stream().map(exp -> mapper.expenseToResponseDTO(exp)).collect(Collectors.toList());
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/add/u/{id}")
    public ResponseEntity<ExpenseResDTO> insert(@PathVariable Long id, @RequestBody ExpenseReqDTO reqDTO) throws Exception {
        var expense = mapper.mapToExpense(reqDTO);
        var res = expenseService.insert(expense, id, reqDTO.category());
        var dto = mapper.expenseToResponseDTO(res);
        return ResponseEntity.ok().body(dto);
    }
    
    @DeleteMapping("/delete/{expId}/u/{userId}")
    public ResponseEntity<Void> delete(@PathVariable Long expId, @PathVariable Long userId){
        expenseService.delete(expId, userId);
        return ResponseEntity.noContent().build();
    }
}
