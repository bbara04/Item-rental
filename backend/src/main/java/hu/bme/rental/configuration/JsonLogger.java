package hu.bme.rental.configuration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JsonLogger {

    private final ObjectMapper objectMapper;

    public void logAsJson(String message, Object object) {
        if (object == null) {
            log.warn("Given object is NULL");
            return;
        }
        try {
            String json = objectMapper.writeValueAsString(object);
            log.info("{}: {}", message, json);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize object to JSON: {}", e.getMessage());
            log.info("{}: {}", message, object);
        }
    }
}