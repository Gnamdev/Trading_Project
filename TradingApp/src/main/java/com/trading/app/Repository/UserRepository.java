package com.trading.app.Repository;

import com.trading.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Long>{

    User findByEmail(String email);

}
