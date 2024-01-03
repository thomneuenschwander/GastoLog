package io.github.thomneuenschwander.GastoLog.application.notebook;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.Notebook;
import io.github.thomneuenschwander.GastoLog.domain.services.NotebookService;
import io.github.thomneuenschwander.GastoLog.repositories.NotebookRepository;

@Service
public class NotebookServiceImpl implements NotebookService {

    @Autowired
    private NotebookRepository notebookRepository;

    @Override
    public Notebook findById(Long id) throws Exception {
        Optional<Notebook> notebookO = notebookRepository.findById(id);
        if(notebookO.isPresent()){
            return notebookO.get();
        }
        throw new Exception("Error com o findById do noteBook");
    }

    @Override
    public List<Expense> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    
    
}
