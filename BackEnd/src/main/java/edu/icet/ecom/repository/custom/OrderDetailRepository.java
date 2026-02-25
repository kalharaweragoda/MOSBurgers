package edu.icet.ecom.repository.custom;

import edu.icet.ecom.entity.OrderDetailEntity;
import edu.icet.ecom.entity.OrderDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, OrderDetailsId> {
}
