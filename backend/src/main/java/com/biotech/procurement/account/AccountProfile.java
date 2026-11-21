package com.biotech.procurement.account;

import com.biotech.procurement.authentication.Role;

// What the account page shows. Shared by buyers and vendors.
public record AccountProfile(String email, String preferredName, String affiliation, Role role) {}