package com.onboard.controllers;

import com.onboard.entities.User;
import com.onboard.entities.Win;
import com.onboard.pojos.WinInfo;
import com.onboard.pojos.WinValidationData;
import com.onboard.repositories.GameRepository;
import com.onboard.repositories.UserRepository;
import com.onboard.repositories.WinRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("${spring.data.rest.base-path}")
public class WinsController {

    private final UserRepository userRepository;
    private final WinRepository winRepository;
    private final GameRepository gameRepository;

    public WinsController(UserRepository userRepository, WinRepository winRepository, GameRepository gameRepository) {
        this.userRepository = userRepository;
        this.winRepository = winRepository;
        this.gameRepository = gameRepository;
    }

    @PostMapping("addWin/{username}")
    public ResponseEntity<List<String>> addWin(@PathVariable String username, @RequestBody WinInfo winInfo){
        if (!gameRepository.existsById(winInfo.getGameId())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<String> errors = validateWin(username, winInfo);
        if (!errors.isEmpty()){
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        winRepository.save(new Win(LocalDate.now(), userRepository.findByUsername(username), gameRepository.getById(winInfo.getGameId())));

        resetSecretCodes(winInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private List<String> validateWin(String username, WinInfo winInfo) {
        List<String> errors = new ArrayList<>();
        for (WinValidationData validation : winInfo.getValidations()){
            if (validation.getUsername().equals(username)){
                errors.add("You cannot use yourself to validate your win");
            }
            if (!userRepository.existsByUsername(validation.getUsername())){
                errors.add("User with username '" + validation.getUsername() + "' does not exist");
            } else if (!userRepository.findByUsername(validation.getUsername()).getSecretCode().equals(validation.getSecretCode())) {
                errors.add("Wrong secret code for user '" + validation.getUsername() + "'");
            }
        }
        return errors;
    }

    private void resetSecretCodes(@RequestBody WinInfo winInfo) {
        for (WinValidationData validation : winInfo.getValidations()){
            User user = userRepository.findByUsername(validation.getUsername());
            user.setSecretCode(RandomString.make(10));
            userRepository.save(user);
        }
    }
}
