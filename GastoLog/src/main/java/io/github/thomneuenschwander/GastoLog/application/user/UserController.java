package io.github.thomneuenschwander.GastoLog.application.user;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    private UserMapper mapper;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        List<User> list = userService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) throws Exception {
        var user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UserDTO> insert(@RequestBody RegisterDTO dto) {
        var mapped = mapper.mapToUser(dto);
        var user = userService.insert(mapped);
        var res = mapper.userToDTO(user, null);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AccessToken> authenticate(@RequestBody CredentialsDTO dto) {
        var jwt = userService.authenticate(dto.email(), dto.password());
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().body(jwt);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(Principal auth) throws Exception {
        var user = userService.findByEmail(auth.getName());
        String path = "/image/get/" + user.getId();
        var url = ServletUriComponentsBuilder
        .fromCurrentRequestUri()
        .path(path)
        .build().toUri();
        var userDTO = mapper.userToDTO(user, url.toString());
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/profile/image/get/{userId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long userId) throws Exception {
        var user = userService.findById(userId);
        var ImageProfile = user.getImageProfile();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(ImageProfile, headers, HttpStatus.OK);
    }

    @PostMapping("/profile/image/add")
    public ResponseEntity<Void> saveImage(@RequestParam("file") MultipartFile file, Principal auth) throws IOException {
        userService.saveImage(file, auth.getName());
        return ResponseEntity.badRequest().build();
    }
}
