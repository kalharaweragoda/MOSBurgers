package edu.icet.ecom.controller;

import edu.icet.ecom.dto.CartData;
import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.dto.OrderRequest;
import edu.icet.ecom.service.custom.CustomerService;
import edu.icet.ecom.service.custom.EmployeeService;
import edu.icet.ecom.service.custom.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

    private final CustomerService customerService;
    private final EmployeeService employeeService;
    private final OrderService orderService;

    @GetMapping(produces = "application/json")
    public CartData getData() {
        CartData data = new CartData();
        data.setCustomers(customerService.getAll());
        data.setEmployees(employeeService.getAll());
        return data;
    }

    @PostMapping(value = "/customer", produces = "application/json")
    public ResponseEntity<Map<String, String>> addCustomer(@Valid @RequestBody Customer customer){
        customerService.add(customer);
        Map<String, String> response = new HashMap<>();
        response.put("message", "customer registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity<Map<String, String>> placeOrder(@RequestBody OrderRequest request){
        orderService.placeOrder(request.getOrder(), request.getProductIdToQuantityMap());
        Map<String, String> response = new HashMap<>();
        response.put("message", "order placed successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
