package com.biotech.procurement.account;

import com.biotech.procurement.authentication.AppUser;
import com.biotech.procurement.authentication.CurrentUser;
import com.biotech.procurement.authentication.Role;
import jakarta.servlet.http.HttpSession;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    private final CurrentUser currentUser;
    private final Map<Role, AccountService> servicesByRole = new EnumMap<>(Role.class);

    // Spring injects every AccountService (buyer and vendor), and we pick one by role.
    public AccountController(CurrentUser currentUser, List<AccountService> services) {
        this.currentUser = currentUser;
        services.forEach(service -> servicesByRole.put(service.role(), service));
    }

    @GetMapping("/api/account")
    public ResponseEntity<AccountProfile> getAccount(HttpSession session) {
        Optional<AppUser> user = currentUser.find(session);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        AccountService service = servicesByRole.get(user.get().role());
        return ResponseEntity.ok(service.getProfile(user.get()));
    }
}