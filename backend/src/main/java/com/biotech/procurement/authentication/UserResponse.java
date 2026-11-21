package com.biotech.procurement.authentication;

public record UserResponse(long id, String email, String preferredName, Role role) {
    static UserResponse from(AppUser user) {
        return new UserResponse(user.id(), user.email(), user.preferredName(), user.role());
    }
}