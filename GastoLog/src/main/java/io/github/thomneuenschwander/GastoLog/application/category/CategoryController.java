package io.github.thomneuenschwander.GastoLog.application.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;

@RestController
@RequestMapping("/category")
public class CategoryController {
    
    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> findAll(){
        List<Category> list =  categoryService.findAll();
        return ResponseEntity.ok().body(list);
    }
}
