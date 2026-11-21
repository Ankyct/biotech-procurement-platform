package com.biotech.procurement.authentication;

public record LoginRequest(String email, String password, String role) {}