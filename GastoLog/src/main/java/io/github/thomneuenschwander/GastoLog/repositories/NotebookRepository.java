package io.github.thomneuenschwander.GastoLog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thomneuenschwander.GastoLog.domain.entities.Notebook;

public interface NotebookRepository extends JpaRepository<Notebook, Long>{
    
}
