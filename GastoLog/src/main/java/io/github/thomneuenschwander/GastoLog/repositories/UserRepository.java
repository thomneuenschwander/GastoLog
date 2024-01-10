package io.github.thomneuenschwander.GastoLog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thomneuenschwander.GastoLog.domain.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    
}
