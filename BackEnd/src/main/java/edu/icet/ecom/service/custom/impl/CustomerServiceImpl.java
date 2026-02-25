package edu.icet.ecom.service.custom.impl;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.entity.CustomerEntity;
import edu.icet.ecom.repository.custom.CustomerRepository;
import edu.icet.ecom.service.custom.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    final CustomerRepository customerRepository;
    final ModelMapper modelMapper;

    @Override
    public void add(Customer customer) {
        CustomerEntity customerEntity = modelMapper.map(customer, CustomerEntity.class);
        customerRepository.save(customerEntity);
    }

    @Override
    public List<Customer> getAll() {
        ArrayList<Customer> customerList = new ArrayList<>();
        List<CustomerEntity> customerEntityList = customerRepository.findAll();

        customerEntityList.forEach(customerEntity ->
                customerList.add(modelMapper.map(customerEntity, Customer.class)));

        return customerList;
    }
}
