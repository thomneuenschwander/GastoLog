package io.github.thomneuenschwander.GastoLog.application.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.DuplicatedTupleException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ResourceNotFoundException;
import io.github.thomneuenschwander.GastoLog.domain.services.UserService;
import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        List<User> list = userRepository.findAll();
        return list;
    }

    @Override
    public User findById(Long id) {
        var userO = userRepository.findById(id);
        return userO.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    @Override
    public User insert(User user) {
        var possibleUser = userRepository.findByEmail(user.getEmail());
        if(possibleUser != null){
            throw new DuplicatedTupleException("email", "user");
        }
        encondePassword(user);
        return userRepository.save(user);
    }
    private void encondePassword(User user){
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
    }
    
    
}
