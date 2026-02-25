package edu.icet.ecom.dto;

import edu.icet.ecom.util.ItemType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Integer id;
    private String itemCode;
    private ItemType itemType;
    private String itemName;

    @NotNull(message = "unitPrice is mandatory")
    @Min(value = 0, message = "unitPrice has to be greater than zero")
    private Double unitPrice;

    @NotNull(message = "discount is mandatory")
    @Min(value = 0, message = "discount has to be greater than 0")
    @Max(value = 100, message = "discount has to be lesser than 100")
    private Double discount;

    @NotNull(message = "quantity is mandatory")
    @Min(value = 0, message = "quantity has to be greater than 0")
    private Integer quantityInStock;

    private List<OrderDetail> orderDetails = new ArrayList<>();
}
