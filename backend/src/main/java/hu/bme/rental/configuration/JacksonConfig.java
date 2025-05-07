package hu.bme.rental.configuration;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        JavaTimeModule javaTimeModule = new JavaTimeModule();

        // ISO-8601 formátum használata a LocalDateTime típusú mezőkhöz
        // Példa: "2023-09-15T14:30:15.123Z"
        objectMapper.registerModule(javaTimeModule);
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);


        // Szép formázott kimenet
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

        // Null értékek kezelése
        objectMapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);

        // Üres objektumok kezelése
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // Körkörös referenciák kezelése
        objectMapper.disable(SerializationFeature.FAIL_ON_SELF_REFERENCES);

        return objectMapper;
    }
}