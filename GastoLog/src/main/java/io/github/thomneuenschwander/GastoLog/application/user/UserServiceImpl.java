package io.github.thomneuenschwander.GastoLog.application.user;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.github.thomneuenschwander.GastoLog.application.jwt.JwtService;
import io.github.thomneuenschwander.GastoLog.domain.AccessToken;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.DuplicatedTupleException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ImageFormatNotSupportedException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ResourceNotFoundException;
import io.github.thomneuenschwander.GastoLog.domain.services.UserService;
import io.github.thomneuenschwander.GastoLog.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtServices;

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
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User insert(User user) {
        var possibleUser = findByEmail(user.getEmail());
        if (possibleUser != null) {
            throw new DuplicatedTupleException("email", "user");
        }
        encondePassword(user);
        return userRepository.save(user);
    }

    private void encondePassword(User user) {
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        var user = findByEmail(email);
        if (user == null) {
            return null;
        }
        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (matches) {
            return jwtServices.generateToken(user);
        }
        return null;
    }

    @Override
    public User saveImage(MultipartFile file, String email) throws IOException {
        if (!file.getContentType().equals(MediaType.IMAGE_JPEG_VALUE)) {
            throw new ImageFormatNotSupportedException("Cannot support " + file.getContentType() + " formt");
        }
        var user = findByEmail(email);
        user.setImageProfile(file.getBytes());
        userRepository.save(user);
        return user;
    }

}
