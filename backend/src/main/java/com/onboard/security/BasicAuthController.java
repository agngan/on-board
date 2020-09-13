package com.onboard.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthController {

    @GetMapping("/api/basicauth")
    public ResponseEntity<Void> authenticate(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
