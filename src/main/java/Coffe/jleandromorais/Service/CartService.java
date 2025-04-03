package Coffe.jleandromorais.Service;

import Coffe.jleandromorais.Models.CartEntity;
import Coffe.jleandromorais.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public CartEntity created(CartEntity cartEntity){
        return  cartRepository.save(cartEntity);
    }
}
