package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Product;
import edu.icet.ecom.service.custom.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @GetMapping(value = "/items", produces = "application/json")
    public List<Product> getAll(HttpServletRequest request){
        return productService.getAll();
    }

    @PostMapping(value = "/dashboard", produces = "application/json")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody Product product){
        productService.update(product);
        Map<String, String> response = new HashMap<>();
        response.put("message", "product updated successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
