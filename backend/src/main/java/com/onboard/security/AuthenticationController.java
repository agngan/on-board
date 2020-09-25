package com.onboard.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${spring.data.rest.base-path}")
public class AuthenticationController {

    @GetMapping("/basicauth")
    public ResponseEntity<Void> authenticate(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegistrationForm registrationForm) {
        // TODO: add validation
        System.out.println(registrationForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
