package com.biotech.procurement.productservices;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/api/products")
    public String getProducts() {
        return "ProductServices API is running";
    }

    @GetMapping("/api/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable long id) {
        return ResponseEntity.of(productService.findById(id));
    }

    @GetMapping("/api/products/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProduct(keyword);
    }
}
