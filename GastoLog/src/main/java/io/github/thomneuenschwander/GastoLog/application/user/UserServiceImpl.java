package io.github.thomneuenschwander.GastoLog.application.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.services.UserService;
import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        List<User> list = userRepository.findAll();
        return list;
    }

    @Override
    public User findById(Long id) throws Exception {
        Optional<User> userO = userRepository.findById(id);
        if(userO.isPresent()){
            return userO.get();
        }
        throw new Exception("Error!");
    }
    
}
