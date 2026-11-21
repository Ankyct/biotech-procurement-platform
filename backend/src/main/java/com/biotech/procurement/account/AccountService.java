package com.biotech.procurement.account;

import com.biotech.procurement.authentication.AppUser;
import com.biotech.procurement.authentication.Role;

// The shared account logic. BuyerAccountService and VendorAccountService both inherit
// getProfile(), so email / preferred name / affiliation are written once.
// Override getProfile() or add methods in a specific service when buyers and vendors diverge.
public interface AccountService {
    Role role();

    default AccountProfile getProfile(AppUser user) {
        return new AccountProfile(user.email(), user.preferredName(), user.affiliation(), user.role());
    }
}