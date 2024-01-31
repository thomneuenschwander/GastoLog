package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;

public interface CategoryService {
    
    List<Category> findAll();

    Category findByName(String categoryName);
}
