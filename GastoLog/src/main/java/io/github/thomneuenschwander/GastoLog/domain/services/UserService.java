package io.github.thomneuenschwander.GastoLog.domain.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import io.github.thomneuenschwander.GastoLog.domain.AccessToken;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;

public interface UserService {

    public List<User> findAll();
    public User findById(Long id);
    public User insert(User user);
    public AccessToken authenticate(String email, String password);
    public User findByEmail(String email);
    public void saveImage(MultipartFile file, String email) throws IOException;
}
