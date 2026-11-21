package com.biotech.procurement.account;

import com.biotech.procurement.authentication.Role;
import org.springframework.stereotype.Service;

@Service
public class BuyerAccountService implements AccountService {
    @Override
    public Role role() {
        return Role.CUSTOMER;
    }

    // Buyer-only features go here later (order history, saved items, ...).
}