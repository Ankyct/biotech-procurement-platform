package com.biotech.procurement.authentication;

// Plain record for now (no database annotations).
public record AppUser(long id, String email, String passwordHash, String preferredName,
                      String affiliation, Role role) {}