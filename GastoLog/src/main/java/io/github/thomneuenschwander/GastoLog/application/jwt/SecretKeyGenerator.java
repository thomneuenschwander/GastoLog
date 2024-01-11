package io.github.thomneuenschwander.GastoLog.application.jwt;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

@Component
public class SecretKeyGenerator {
    
    private SecretKey key;

    public SecretKey getSecretKey() {
        if(this.key == null){
            this.key = Jwts.SIG.HS256.key().build();
        }
        return key;
    }

    
}
