package edu.icet.ecom.dto;

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
public class Order {
    private Integer id;
    private String date;
    private Integer employeeId;
    private String employeeName;
    private Integer customerId;
    private Double total;
    private String paymentType;
    private List<OrderDetail> orderDetails= new ArrayList<>();
}
