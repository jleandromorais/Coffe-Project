package Coffe.jleandromorais.Repository;

import Coffe.jleandromorais.Models.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartEntity,Long> {
    List<CartEntity> findByProductId(Long productId);

}
