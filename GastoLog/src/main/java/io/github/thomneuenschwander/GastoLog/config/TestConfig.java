package io.github.thomneuenschwander.GastoLog.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;

import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        
        User u1 = new User(null,"maria012", "Maria Brown", "maria@gmail.com", "123456", null);
        User u2 = new User(null,"joaoMALUCO", "Joao keiloing", "keiloing@gmail.com", "joao123", null);
        User u3 = new User(null,"cavaloVerde", "Marcos nuord", "Marcos@gmail.com", "123", null);

        userRepository.saveAll(Arrays.asList(u1,u2,u3));
    }
    
}
