package io.github.thomneuenschwander.GastoLog.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import io.github.thomneuenschwander.GastoLog.domain.entities.Notebook;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;

import io.github.thomneuenschwander.GastoLog.repositories.NotebookRepository;
import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotebookRepository notebookRepository;



    @Override
    public void run(String... args) throws Exception {
        
        User u1 = new User(null,"maria012", "Maria Brown", "maria@gmail.com", "123456", null);
        User u2 = new User(null,"joaoMALUCO", "Joao keiloing", "keiloing@gmail.com", "joao123", null);
        User u3 = new User(null,"cavaloVerde", "Marcos nuord", "Marcos@gmail.com", "123", null);

        userRepository.saveAll(Arrays.asList(u1,u2,u3));

        Notebook n1 = new Notebook(null, "Gostaria de poupar dinheiro para o natal", u1);
        Notebook n2 = new Notebook(null, "Quero fazer uma viajem no fim de ano", u2);
        Notebook n3 = new Notebook(null, "Nao quero mais ficar gastando dinheiro com besteira", u3);

        

        notebookRepository.saveAll(Arrays.asList(n1,n2,n3));
    }
    
}
