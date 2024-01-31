package io.github.thomneuenschwander.GastoLog.domain.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import io.github.thomneuenschwander.GastoLog.domain.AccessToken;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;

public interface UserService {
    
    List<User> findAll();

    User findById(Long id);

    User insert(User user);

    AccessToken authenticate(String email, String password);

    User findByEmail(String email);

    User saveImage(MultipartFile file, String email) throws IOException;
}
