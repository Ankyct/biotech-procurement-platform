package com.biotech.procurement.productservices;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductControllerTest {
    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(new ProductController(new ProductService())).build();
    }

    @Test
    void returnsProductDetails() throws Exception {
        mvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith("application/json"))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("Sterile Pipette Tips"))
            .andExpect(jsonPath("$.description").isNotEmpty())
            .andExpect(jsonPath("$.price").value(24.99))
            .andExpect(jsonPath("$.vendor").value("Example Vendor"))
            .andExpect(jsonPath("$.specifications.Material").value("Polypropylene"));
    }

    @Test
    void returnsServiceSpecifications() throws Exception {
        mvc.perform(get("/api/products/3"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.specifications.Turnaround").value("5 business days"));
    }

    @Test
    void missingProductReturns404() throws Exception {
        mvc.perform(get("/api/products/999")).andExpect(status().isNotFound());
        mvc.perform(get("/api/products/-1")).andExpect(status().isNotFound());
    }

    @Test
    void invalidIdReturns400() throws Exception {
        mvc.perform(get("/api/products/invalid")).andExpect(status().isBadRequest());
    }

    @Test
    void preservesExistingEndpoint() throws Exception {
        mvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(content().string("ProductServices API is running"));
    }
}
