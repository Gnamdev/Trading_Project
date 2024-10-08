package com.trading.app.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class AppConfig {
    @Bean
    public  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(managment-> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
                authorizeHttpRequests(auth -> auth.requestMatchers("/api/**").authenticated().anyRequest().permitAll())

                .addFilterBefore(new JwtValidator() , BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cros -> cros.configurationSource(corsConfigurationSources()));

                 return http.build();
    }

    private CorsConfigurationSource corsConfigurationSources() {
    return  null;
    }
}
