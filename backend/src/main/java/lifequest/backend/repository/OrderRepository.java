package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paypal.api.payments.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
    
}
