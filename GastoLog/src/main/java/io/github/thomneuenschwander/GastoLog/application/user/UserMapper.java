package io.github.thomneuenschwander.GastoLog.application.user;

import org.springframework.stereotype.Component;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;

@Component
public class UserMapper {
    
    public User mapToUser(RegisterDTO dto){
        return new User(null, dto.name(), dto.email(), dto.password(), null, null);
    }

    public UserDTO userToDTO(User user){
        return new UserDTO(user.getName(), user.getEmail());
    }

}
