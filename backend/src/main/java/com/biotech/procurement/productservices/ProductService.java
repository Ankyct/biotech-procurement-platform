package com.biotech.procurement.productservices;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Locale;

@Service
public class ProductService {
    // Demo catalog only; these IDs are independent of PostgreSQL seed data.
    private final Map<Long, Product> products = Map.of(
        1L, new Product(1, "Sterile Pipette Tips",
            "Sterile polypropylene pipette tips for accurate laboratory liquid handling.",
            new BigDecimal("24.99"), "Example Vendor",
            Map.of("Volume", "200 µL", "Material", "Polypropylene",
                   "Sterility", "Sterile", "Package Size", "96 tips / rack")),
        2L, new Product(2, "PCR Kit", "Reagents for routine PCR amplification.",
            new BigDecimal("120.00"), "Example BioSupplier",
            Map.of("Reactions", "100", "Storage", "-20 °C")),
        3L, new Product(3, "Pipette Calibration Service",
            "Calibration and performance verification for a single-channel pipette.",
            new BigDecimal("85.00"), "Example Lab Services",
            Map.of("Turnaround", "5 business days", "Report", "Calibration certificate"))
    );

    public Optional<Product> findById(long id) {
        return Optional.ofNullable(products.get(id));
    }

    public List<Product> searchProduct(String keyword) {
        String searchItem = keyword.trim().toLowerCase(Locale.ROOT);

        return products.values().stream()
            .filter(product -> product.name().toLowerCase(Locale.ROOT).contains(searchItem) ||
                               product.description().toLowerCase(Locale.ROOT).contains(searchItem))
            .sorted((p1, p2) -> p1.name().compareToIgnoreCase(p2.name()))
            .toList();
    }
}
