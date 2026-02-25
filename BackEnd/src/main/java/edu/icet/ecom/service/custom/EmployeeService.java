package edu.icet.ecom.service.custom;

import edu.icet.ecom.dto.Employee;

import java.util.List;

public interface EmployeeService {
    void add(Employee employee);
    List<Employee> getAll();
}
