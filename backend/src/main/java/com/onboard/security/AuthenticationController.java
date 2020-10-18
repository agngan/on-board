package com.onboard.security;

import com.onboard.entities.User;
import com.onboard.repositories.RoleRepository;
import com.onboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${spring.data.rest.base-path}")
public class AuthenticationController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthenticationController(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/basicauth")
    public ResponseEntity<Void> authenticate() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<List<String>> register(@Valid @RequestBody RegistrationForm registrationForm, BindingResult bindingResult) {
        validateForm(registrationForm, bindingResult);
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors()
                    .stream().map(ObjectError::getDefaultMessage).collect(Collectors.toList()), HttpStatus.BAD_REQUEST);
        }
        userRepository.save(getUser(registrationForm));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private User getUser(RegistrationForm registrationForm) {
        User user = registrationForm.toUser(passwordEncoder);
        user.setRoles(Collections.singletonList(roleRepository.findByName("ROLE_USER")));
        return user;
    }

    private void validateForm(RegistrationForm form, BindingResult bindingResult) {
        if (userRepository.existsByUsername(form.getUsername())){
            bindingResult.addError(new ObjectError("username.unique", "Username already taken"));
        }
        if (!form.getPassword().equals(form.getRepeatedPassword())){
            bindingResult.addError(new ObjectError("password.match", "Passwords must match"));
        }
        if (userRepository.existsByEmail(form.getEmail())){
            bindingResult.addError(new ObjectError("email.unique", "User with this email already exists"));
        }
    }
}
