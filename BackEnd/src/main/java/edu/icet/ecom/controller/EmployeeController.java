package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Employee;
import edu.icet.ecom.service.custom.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class EmployeeController {

    final EmployeeService employeeService;

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity <Map<String, String>> addEmployee(@Valid @RequestBody Employee employee){
        employeeService.add(employee);
        Map<String, String> response = new HashMap<>();
        response.put("message", "employee registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
