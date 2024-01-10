package io.github.thomneuenschwander.GastoLog.domain.services;

import java.util.List;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;

public interface UserService {

    public List<User> findAll();
    public User findById(Long id);
    // public User insert(User user);

}
