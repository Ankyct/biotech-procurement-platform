package com.biotech.procurement.authentication;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import org.springframework.stereotype.Component;

// Looks up the logged-in user from the session. Any controller can use this.
@Component
public class CurrentUser {
    static final String SESSION_KEY = "userId";

    private final UserRepository users;

    public CurrentUser(UserRepository users) {
        this.users = users;
    }

    public Optional<AppUser> find(HttpSession session) {
        Object id = session.getAttribute(SESSION_KEY);
        if (!(id instanceof Long userId)) {
            return Optional.empty();
        }
        return users.findById(userId);
    }
}