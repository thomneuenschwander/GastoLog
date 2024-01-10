package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;

public interface CategoryService {
    public List<Category> findAll();
    public Category findByName(String categoryName);
}
