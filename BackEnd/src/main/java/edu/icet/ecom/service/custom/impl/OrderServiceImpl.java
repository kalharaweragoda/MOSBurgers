package edu.icet.ecom.service.custom.impl;

import edu.icet.ecom.dto.Order;
import edu.icet.ecom.entity.OrderDetailEntity;
import edu.icet.ecom.entity.OrderEntity;
import edu.icet.ecom.entity.ProductEntity;
import edu.icet.ecom.repository.custom.OrderDetailRepository;
import edu.icet.ecom.repository.custom.OrderRepository;
import edu.icet.ecom.repository.custom.ProductRepository;
import edu.icet.ecom.service.custom.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public void placeOrder(Order order, Map<Integer, Integer> productIdToQuantityMap) {

        OrderEntity savedOrder = orderRepository.save(modelMapper.map(order, OrderEntity.class));

        for (Map.Entry<Integer, Integer> entry:productIdToQuantityMap.entrySet()){
            Integer productId = entry.getKey();
            Integer quantityPurchased = entry.getValue();

            ProductEntity productEntity = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + productId));


            OrderDetailEntity orderDetailEntity = new OrderDetailEntity(
                    productEntity,
                    savedOrder,
                    productEntity.getUnitPrice(),
                    quantityPurchased
            );


            orderDetailRepository.save(orderDetailEntity);

            productEntity.setQuantityInStock(productEntity.getQuantityInStock()-quantityPurchased);
            productRepository.save(productEntity);
        }
    }
}
