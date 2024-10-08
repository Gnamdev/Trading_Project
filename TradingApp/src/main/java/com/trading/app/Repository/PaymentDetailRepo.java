package com.trading.app.Repository;

import com.trading.app.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailRepo extends JpaRepository<PaymentDetails , Long> {

    PaymentDetails findByUserId(Long userId);

}
