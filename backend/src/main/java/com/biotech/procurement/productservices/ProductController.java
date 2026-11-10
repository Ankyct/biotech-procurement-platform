package com.biotech.procurement.productservices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @GetMapping("/api/products")
    public String getProducts() {
        return "ProductServices API is running";
    }
}