package io.github.thomneuenschwander.GastoLog.application.jwt;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.thomneuenschwander.GastoLog.domain.AccessToken;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    @Autowired
    private SecretKeyGenerator keyGenerator;
    
    public AccessToken generateToken(User user){

        var key = keyGenerator.getSecretKey();
        var claims = generateTokenClaims(user);
        var exp = generateExpirationDate();

        String token = Jwts.builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(exp)
                .claims(claims)
                .compact();

        return new AccessToken(token);
    }

    private Map<String, Object> generateTokenClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        return claims;
    }

    private Date generateExpirationDate() {
        var expirationMinutes = 60;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    public String getEmailFromToken(String jwt) {
        try {
            JwtParser build = Jwts.parser()
                    .verifyWith(keyGenerator.getSecretKey())
                    .build();

            Jws<Claims> jwsClaims = build.parseSignedClaims(jwt);
            Claims claims = jwsClaims.getPayload();
            return claims.getSubject();

        }catch (JwtException e){
            throw new InvalidTokenException(e.getMessage());
        }
    }
}