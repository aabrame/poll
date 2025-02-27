package fr.formation.poll_backend_webservice_springboot.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import fr.formation.poll_backend_webservice_springboot.models.User;
import fr.formation.poll_backend_webservice_springboot.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;

    public User findUser(String username, String password) {
        final var user = userRepository.findByEmail(username)
            .orElseThrow(() -> new BadCredentialsException("invalid email or password"));
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("invalid email or password");
        return user;
    }

    public User findUser(String refreshToken) {
        final var jwt = jwtDecoder.decode(refreshToken);
        return userRepository.findById(Long.parseLong(jwt.getSubject()))
            .orElseThrow(() -> new BadCredentialsException("invalid refresh token"));
    }

    public String generateAccessToken(User user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuedAt(Instant.now())
            .issuer("poll-backend")
            .expiresAt(Instant.now().plus(5, ChronoUnit.MINUTES))
            .subject(String.valueOf(user.getId()))
            .claim("name", user.getName())
            .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(User user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuedAt(Instant.now())
            .issuer("poll-backend")
            .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
            .subject(String.valueOf(user.getId()))
            .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        
    }


}
