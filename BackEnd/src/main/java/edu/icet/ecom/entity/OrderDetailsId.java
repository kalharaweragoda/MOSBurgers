package edu.icet.ecom.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
@Embeddable
public class OrderDetailsId implements Serializable {
    @Column(name = "product_id")
    private Integer prodId;

    @Column(name = "order_id")
    private Integer orderId;

    public OrderDetailsId(){}

    public OrderDetailsId(Integer orderId, Integer prodId){
        this.orderId=orderId;
        this.prodId=prodId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o==null||getClass()!=o.getClass()) return false;
        OrderDetailsId orderDetailsId = (OrderDetailsId) o;
        return Objects.equals(prodId, orderDetailsId.prodId) && Objects.equals(orderId, orderDetailsId.orderId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prodId, orderId);
    }

}

