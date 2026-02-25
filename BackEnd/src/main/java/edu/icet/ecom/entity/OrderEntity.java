package edu.icet.ecom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 20)
    private String date;

    @Column(nullable = false, name = "employee_id")
    private Integer employeeId;

    @Column(nullable = false, name = "employee_name")
    private String employeeName;

    @Column(nullable = false, name = "customer_id")
    private Integer customerId;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false, name = "payment_type")
    private String paymentType;

    @OneToMany(mappedBy = "orderEntity", cascade = {CascadeType.MERGE})
    private List<OrderDetailEntity> orderDetails = new ArrayList<>();
}

