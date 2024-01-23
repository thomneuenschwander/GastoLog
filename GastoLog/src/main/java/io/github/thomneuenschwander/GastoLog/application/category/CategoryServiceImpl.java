package io.github.thomneuenschwander.GastoLog.application.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.CategoryNotFoundException;
import io.github.thomneuenschwander.GastoLog.domain.services.CategoryService;
import io.github.thomneuenschwander.GastoLog.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findByName(String categoryName) {
        var categoryO = categoryRepository.findByName(categoryName);
        return categoryO.orElseThrow(() -> new CategoryNotFoundException(categoryName));
    }
    
}
