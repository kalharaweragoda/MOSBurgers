package edu.icet.ecom.service.custom.impl;

import edu.icet.ecom.dto.Employee;
import edu.icet.ecom.entity.EmployeeEntity;
import edu.icet.ecom.repository.custom.EmployeeRepository;
import edu.icet.ecom.service.custom.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    final EmployeeRepository employeeRepository;
    final ModelMapper modelMapper;
    final PasswordEncoder passwordEncoder;

    @Override
    public void add(Employee employee) {
        EmployeeEntity employeeEntity = modelMapper.map(employee, EmployeeEntity.class);
        employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));
        employeeRepository.save(employeeEntity);
    }

    @Override
    public List<Employee> getAll() {
        ArrayList<Employee> employeeList = new ArrayList<>();
        List<EmployeeEntity> employeeEntityList = employeeRepository.findAll();

        employeeEntityList.forEach(employeeEntity ->
                employeeList.add(modelMapper.map(employeeEntity, Employee.class)));

        return employeeList;
    }
}
