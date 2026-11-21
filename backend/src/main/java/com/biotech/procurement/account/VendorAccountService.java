package com.biotech.procurement.account;

import com.biotech.procurement.authentication.Role;
import org.springframework.stereotype.Service;

@Service
public class VendorAccountService implements AccountService {
    @Override
    public Role role() {
        return Role.VENDOR;
    }

    // Vendor-only features go here later (manage listings, incoming orders, ...).
}