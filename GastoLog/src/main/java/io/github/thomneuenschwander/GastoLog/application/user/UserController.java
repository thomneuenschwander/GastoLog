package io.github.thomneuenschwander.GastoLog.application.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thomneuenschwander.GastoLog.domain.AccessToken;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        List<User> list =  userService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) throws Exception {
        var user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<User> insert(@RequestBody RegisterDTO dto) {
        var mapped = userMapper.mapToUser(dto);
        var res = userService.insert(mapped);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AccessToken> authenticate(@RequestBody CredentialsDTO dto) {
        var jwt = userService.authenticate(dto.email(), dto.password());
        if(jwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().body(jwt);
    }
}
