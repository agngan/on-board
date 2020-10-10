package com.onboard.controllers;

import com.onboard.entities.Game;
import com.onboard.entities.Win;
import com.onboard.pojos.ProfileInfo;
import com.onboard.repositories.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${spring.data.rest.base-path}/myProfile")
public class MyProfileController {

    private final UserRepository userRepository;

    public MyProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<ProfileInfo> getProfile(@PathVariable String username){
        if (!userRepository.existsByUsername(username)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Win> userWins = userRepository.findByUsername(username).getWins();
        Map<String, Long> scores = userWins.stream().collect(Collectors.groupingBy(win -> win.getGame().getName(), Collectors.counting()));
        String gameWithHighestScore = Collections.max(scores.entrySet(), Map.Entry.comparingByValue()).getKey();

        return new ResponseEntity<>(new ProfileInfo((long) userWins.size(), gameWithHighestScore, RandomString.make(10)), HttpStatus.OK);
    }
}
