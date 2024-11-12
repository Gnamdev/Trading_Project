package com.trading.app.Config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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

        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(
                        List.of(
                                "http://localhost:5173"
                        )
                );

                config.setAllowedMethods(Collections.singletonList("*"));

                config.setAllowCredentials(true);

                config.setExposedHeaders(Collections.singletonList("Authorization"));
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);

                return config;
            }
        };
    }
//    @Bean
//    public HttpFirewall allowNewLineHttpFirewall() {
//        StrictHttpFirewall firewall = new StrictHttpFirewall();
//        firewall.setAllowUrlEncodedPeriod(true); // Allows encoded newlines
//        return firewall;
//    }

}
