package com.biotech.procurement.productservices;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ProductControllerTest {

    @Test
    void getProductsReturnsExpectedMessage() {
        ProductController controller = new ProductController();

        String result = controller.getProducts();

        assertEquals(
            "ProductServices API is running",
            result
        );
    }
}
