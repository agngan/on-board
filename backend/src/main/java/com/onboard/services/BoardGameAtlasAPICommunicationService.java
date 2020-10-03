package com.onboard.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class BoardGameAtlasAPICommunicationService {

    public List<Map<String, Object>> getGames(Map<String, String> parameters) {

        if (!putApiKeyIfPossible(parameters))
            return null;
        UriComponentsBuilder uriBuilder = createUriComponentsBuilder(parameters);

        String resultJson = new RestTemplate().getForObject(uriBuilder.toUriString(), String.class, parameters);
        if (resultJson == null)
            return null;

        Map<String, List<Map<String, Object>>> resultMap = parseToMap(resultJson);
        if (resultMap == null)
            return null;

        return resultMap.get("games");
    }

    private boolean putApiKeyIfPossible(Map<String, String> parameters) {
        String api_key;
        try {
            api_key = getApiKey();
        } catch (IOException e) {
            log.error("Error loading api key from file.");
            return false;
        }
        parameters.put("client_id", api_key);
        return true;
    }

    private String getApiKey() throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("apiKey.yml");
        if (inputStream == null)
            throw new IOException();
        return new ObjectMapper().readValue(inputStream, String.class);
    }

    private UriComponentsBuilder createUriComponentsBuilder(Map<String, String> parameters) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://api.boardgameatlas.com/api/search");
        for (Map.Entry<String, String> entry : parameters.entrySet()) {
            uriBuilder.queryParam(entry.getKey(), entry.getValue());
        }
        return uriBuilder;
    }

    private Map<String, List<Map<String, Object>>> parseToMap(String resultJson) {
        Map<String, List<Map<String, Object>>> resultMap;
        try {
            resultMap = new ObjectMapper().readValue(resultJson, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            log.error("Error parsing JSON result to map.");
            resultMap = null;
        }
        return resultMap;
    }
}
