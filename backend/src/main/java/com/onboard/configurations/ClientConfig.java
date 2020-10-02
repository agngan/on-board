package com.onboard.configurations;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Configuration
public class ClientConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.rootUri("https://api.boardgameatlas.com/api").build();
    }

    public String getApiKey() throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("apiKey.yml");
        if (inputStream == null)
            throw new IOException();
        return new ObjectMapper().readValue(inputStream, String.class);
    }
}
