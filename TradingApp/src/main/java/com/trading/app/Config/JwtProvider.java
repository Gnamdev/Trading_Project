package com.trading.app.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class JwtProvider {

    private final static SecretKey secretKey = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public static  String  generateToken( Authentication auth) {
        Collection<? extends GrantedAuthority> authorities =auth.getAuthorities();
         String roles  = popylateAthorities(authorities);
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(secretKey)
                .compact();
    }


    public  static String getEmailFromToken(String token) {
        token = token.substring(7);

        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();

        String email = String.valueOf(claims.get("email"));


        return email;
    }

     private static String popylateAthorities(Collection<? extends GrantedAuthority> authorities) {

         Set<String> authoritieSet = new HashSet<>();
         for (GrantedAuthority authority : authorities) {
             authoritieSet.add(authority.getAuthority());
         }
         return String.join(",", authoritieSet);
    }
}
