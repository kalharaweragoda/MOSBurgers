package edu.icet.ecom.service.custom.impl;

import edu.icet.ecom.dto.Product;
import edu.icet.ecom.entity.ProductEntity;
import edu.icet.ecom.repository.custom.ProductRepository;
import edu.icet.ecom.service.custom.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<Product> getAll() {
        ArrayList<Product> productList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findAll();

        productEntityList.forEach(productEntity ->{
            Product product = new Product();
            product.setId(productEntity.getId());
            product.setItemCode(productEntity.getItemCode());
            product.setItemName(productEntity.getItemName());
            product.setItemType(productEntity.getItemType());
            product.setDiscount(productEntity.getDiscount());
            product.setQuantityInStock(productEntity.getQuantityInStock());
            product.setUnitPrice(productEntity.getUnitPrice());
            product.setOrderDetails(new ArrayList<>());

            productList.add(product);
        });



        return productList;
    }

    @Override
    public void update(Product product) {
        ProductEntity productEntity = productRepository.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Product not found " + product.getId()));

        productEntity.setQuantityInStock(product.getQuantityInStock());
        productEntity.setDiscount(product.getDiscount());
        productEntity.setUnitPrice(product.getUnitPrice());

        productRepository.save(productEntity);
    }
}
