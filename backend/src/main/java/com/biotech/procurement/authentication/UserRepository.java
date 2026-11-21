package com.biotech.procurement.authentication;

import java.util.Optional;

// When you add PostgreSQL later, replace InMemoryUserRepository with a database-backed
// implementation of this interface. AuthController won't need to change.
public interface UserRepository {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findById(long id);
}