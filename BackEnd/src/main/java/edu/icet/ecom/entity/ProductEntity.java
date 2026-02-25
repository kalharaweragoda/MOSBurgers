package edu.icet.ecom.entity;

import edu.icet.ecom.util.ItemType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100, name = "item_code")
    private String itemCode;

    @Column(nullable = false, length = 50, name = "item_type")
    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @Column(nullable = false, length = 100, name = "item_name")
    private String itemName;

    @Column(nullable = false, name = "unit_price")
    private Double unitPrice;

    @Column(nullable = false)
    private Double discount;

    @Column(nullable = false, name = "quantity")
    private Integer quantityInStock;

    @OneToMany(mappedBy = "productEntity", cascade = {CascadeType.MERGE})
    private List<OrderDetailEntity> orderDetails = new ArrayList<>();
}
