package fr.formation.poll_backend_webservice_springboot.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.poll_backend_webservice_springboot.models.User;
import fr.formation.poll_backend_webservice_springboot.services.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    
    public enum GrantType {
        refreshToken,
        password
    }

    @Getter
    @Setter
    public static class JwtRequest {
        private GrantType grantType;
        private String username;
        private String password;
        private String refreshToken;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class JwtResponse {
        private String accessToken;
        private String refreshToken;
    }

    private final AuthenticationService authenticationService;

    @PostMapping("authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) {
        User user = switch (jwtRequest.getGrantType()) {
            case password -> authenticationService.findUser(jwtRequest.getUsername(), jwtRequest.getPassword());
            case refreshToken -> authenticationService.findUser(jwtRequest.getRefreshToken());
        };
        return new JwtResponse(
            authenticationService.generateAccessToken(user), 
            authenticationService.generateRefreshToken(user));
    }

}
