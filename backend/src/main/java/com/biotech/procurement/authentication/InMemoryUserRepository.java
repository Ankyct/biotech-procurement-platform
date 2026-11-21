package com.biotech.procurement.authentication;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

// Hard-coded demo accounts for testing the login flow. Passwords are hashed at startup.
// Remove this class once real users live in a database.
@Repository
public class InMemoryUserRepository implements UserRepository {
    private final List<AppUser> users;

    public InMemoryUserRepository(PasswordEncoder passwordEncoder) {
        users = List.of(
            new AppUser(1, "customer@example.com", passwordEncoder.encode("customer123"),
                    "Demo Customer", "Example University Biology Lab", Role.CUSTOMER),
            new AppUser(2, "vendor@example.com", passwordEncoder.encode("vendor123"),
                    "Demo Vendor", "Example BioSupplier", Role.VENDOR)
        );
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        String normalized = email.trim().toLowerCase(Locale.ROOT);
        return users.stream().filter(u -> u.email().equals(normalized)).findFirst();
    }

    @Override
    public Optional<AppUser> findById(long id) {
        return users.stream().filter(u -> u.id() == id).findFirst();
    }
}