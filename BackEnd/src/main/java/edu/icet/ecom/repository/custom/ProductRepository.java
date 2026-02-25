package edu.icet.ecom.repository.custom;

import edu.icet.ecom.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    Optional<ProductEntity> findById(Integer id);
}
