package io.github.thomneuenschwander.GastoLog.application.notebook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thomneuenschwander.GastoLog.domain.entities.Notebook;

@RestController
@RequestMapping("/notebook")
public class NotebookController {
    
    @Autowired
    private NotebookServiceImpl notebookService;

    @GetMapping("/{id}")
    public ResponseEntity<Notebook> findById(@PathVariable Long id) throws Exception {
        Notebook notebook = notebookService.findById(id);
        return ResponseEntity.ok().body(notebook);
    }
}
