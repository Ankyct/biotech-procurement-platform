package com.biotech.procurement.productservices;

import java.math.BigDecimal;
import java.util.Map;

public record Product(long id, String name, String description, BigDecimal price,
                      String vendor, Map<String, String> specifications) {
    public Product {
        specifications = Map.copyOf(specifications);
    }
}
