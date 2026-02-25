package edu.icet.ecom.service.custom;

import edu.icet.ecom.dto.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAll();
    void update(Product product);
}
