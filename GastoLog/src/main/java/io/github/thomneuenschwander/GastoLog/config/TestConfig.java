package io.github.thomneuenschwander.GastoLog.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import io.github.thomneuenschwander.GastoLog.domain.entities.Category;
import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.repositories.CategoryRepository;
import io.github.thomneuenschwander.GastoLog.repositories.ExpenseRepository;
import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired private UserRepository userRepository;

    @Autowired ExpenseRepository expenseRepository;

    @Autowired CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        
        User u1 = new User(null,"maria012", "Maria Brown", "maria@gmail.com", "123456", null);
        User u2 = new User(null,"joaoMALUCO", "Joao keiloing", "keiloing@gmail.com", "joao123", null);
        User u3 = new User(null,"cavaloVerde", "Marcos nuord", "Marcos@gmail.com", "123", null);

        Expense e1 = new Expense(null, "desc1", 1.99, null, u3);
        Expense e2 = new Expense(null, "desc2", 10.80, null, u1);
        Expense e3 = new Expense(null, "desc3", 111.01, null, u1);
        Expense e4 = new Expense(null, "desc4", 5.90, null, u2);

        Category cat1 = new Category(null, "Guloseimas");
        Category cat2 = new Category(null, "Esportes");
        Category cat3 = new Category(null, "Estudos");
        Category cat4 = new Category(null, "Transporte");

        categoryRepository.saveAll(Arrays.asList(cat1,cat2,cat3,cat4));

        e1.getCategories().add(cat4);
        e1.getCategories().add(cat1);
        e1.getCategories().add(cat3);
        e2.getCategories().add(cat2);
        e3.getCategories().add(cat3);
        e4.getCategories().add(cat3);
        e1.getCategories().add(cat1);

        userRepository.saveAll(Arrays.asList(u1,u2,u3));
        expenseRepository.saveAll(Arrays.asList(e1,e2,e3,e4));
    }
    
}
