package edu.icet.ecom.service.custom;

import edu.icet.ecom.dto.Order;

import java.util.Map;

public interface OrderService {
    void placeOrder(Order order, Map<Integer, Integer> productIdToQuantityMap);
}
