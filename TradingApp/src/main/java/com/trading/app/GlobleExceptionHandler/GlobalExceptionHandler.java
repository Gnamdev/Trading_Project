package com.trading.app.GlobleExceptionHandler;

import com.trading.app.Exception.ValidationException;
import com.trading.app.Response.AuthResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<?> handleValidationException(ValidationException ex) {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setStatus(false);
        authResponse.setMessage("Validation error");
        authResponse.setErrors(ex.getErrors());

        return new ResponseEntity<>(authResponse.getErrors(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setStatus(false);
        authResponse.setMessage("Validation error");
        authResponse.setErrors(errors);

        return new ResponseEntity<>(authResponse.getErrors(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> userNotFoundException(Exception ex) {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setStatus(false);
        authResponse.setMessage("User Not Found  , please provide correct username and password");

        return new ResponseEntity<>(authResponse.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // Handle other exceptions as needed
    @ExceptionHandler(Exception.class)
    public ResponseEntity<AuthResponse> handleGenericException(Exception ex) {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setStatus(false);
        authResponse.setMessage("An unexpected error occurred");

        return new ResponseEntity<>(authResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleException(Exception e) {
        // Log the exception message

        log.info("error ---> {}" , e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
