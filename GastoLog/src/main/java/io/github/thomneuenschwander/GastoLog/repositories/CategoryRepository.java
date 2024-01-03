package io.github.thomneuenschwander.GastoLog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
