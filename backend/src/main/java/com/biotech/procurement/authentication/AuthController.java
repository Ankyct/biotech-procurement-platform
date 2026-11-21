package com.biotech.procurement.authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final String USER_ID = "userId";

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest body, HttpServletRequest request) {
        Optional<AppUser> found = Optional.empty();
        Role role = parseRole(body.role());

        if (body.email() != null && body.password() != null && role != null) {
            found = users.findByEmail(body.email().trim().toLowerCase(Locale.ROOT));
        }

        // One generic error for wrong email, wrong password, or wrong account type,
        // so the response never reveals which accounts exist.
        if (found.isEmpty()
                || !passwordEncoder.matches(body.password(), found.get().passwordHash())
                || found.get().role() != role) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email, password, or account type."));
        }

        request.getSession(true);
        request.changeSessionId(); // prevents session fixation
        request.getSession().setAttribute(USER_ID, found.get().id());
        return ResponseEntity.ok(UserResponse.from(found.get()));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(HttpSession session) {
        Object id = session.getAttribute(USER_ID);
        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return users.findById((Long) id)
                .map(user -> ResponseEntity.ok(UserResponse.from(user)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.noContent().build();
    }

    private static Role parseRole(String value) {
        try {
            return value == null ? null : Role.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}