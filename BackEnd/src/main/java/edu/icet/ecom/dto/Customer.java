package edu.icet.ecom.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Valid
    private Integer id;

    @NotBlank(message = "name is mandatory")
    @Size(min = 2, message = "name should be 2 or more characters")
    private String name;

    @NotBlank(message = "email is mandatory")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "not a valid email address")
    private String email;

    @NotBlank(message = "phone number is mandatory")
    @Pattern(regexp = "^\\d+$", message = "phone no. should contain only numbers")
    @Size(min = 10, max = 15, message = "phone no. should be between 10 and 15 characters")
    private String phoneNo;
}
