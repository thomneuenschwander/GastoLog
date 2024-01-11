package io.github.thomneuenschwander.GastoLog.config.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import io.github.thomneuenschwander.GastoLog.application.jwt.JwtService;
import io.github.thomneuenschwander.GastoLog.application.user.UserServiceImpl;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.InvalidTokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceImpl userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = getToken(request);

        if (jwt != null) {
            try {
                String email = jwtService.getEmailFromToken(jwt);
                User user = userService.findByEmail(email);
                setUserAsAuthenticated(user);
            } catch (InvalidTokenException e) {
                System.out.println(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);

    }

    private String getToken(HttpServletRequest req) {
        String headerAuthorization = req.getHeader("Authorization");

        if (headerAuthorization != null) {
            String[] split = headerAuthorization.split(" ");

            if (split.length == 2) {
                return split[1];
            }
        }
        return null;
    }

    private void setUserAsAuthenticated(User user) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, "",
                userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
