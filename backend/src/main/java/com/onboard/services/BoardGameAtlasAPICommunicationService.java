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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class BoardGameAtlasAPICommunicationService {

    public List<Map<String, Object>> getGames(Map<String, String> parameters) {

        if (!putApiKeyIfPossible(parameters))
            return null;
        UriComponentsBuilder uriBuilder = createUriComponentsBuilder("https://api.boardgameatlas.com/api/search", parameters);

        Map<String, List<Map<String, Object>>> resultMap = getFromAPI(parameters, uriBuilder);
        if (resultMap == null) return null;

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

    private UriComponentsBuilder createUriComponentsBuilder(String baseUrl, Map<String, String> parameters) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl);
        for (Map.Entry<String, String> entry : parameters.entrySet()) {
            uriBuilder.queryParam(entry.getKey(), entry.getValue());
        }
        return uriBuilder;
    }

    private Map<String, List<Map<String, Object>>> getFromAPI(Map<String, String> parameters, UriComponentsBuilder uriBuilder) {
        String resultJson = new RestTemplate().getForObject(uriBuilder.toUriString(), String.class, parameters);
        if (resultJson == null)
            return null;

        return parseToMap(resultJson);
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

    public List<Map<String, Object>> getCategories() {

        Map<String, String> parameters = new HashMap<>();
        if (!putApiKeyIfPossible(parameters))
            return null;
        UriComponentsBuilder uriBuilder = createUriComponentsBuilder("https://api.boardgameatlas.com/api/game/categories", parameters);

        Map<String, List<Map<String, Object>>> resultMap = getFromAPI(parameters, uriBuilder);
        if (resultMap == null) return null;

        return resultMap.get("categories");
    }

}
