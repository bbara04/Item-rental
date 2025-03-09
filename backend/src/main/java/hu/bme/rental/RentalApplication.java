package hu.bme.rental;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Slf4j
//TODO ezeket vissza, ha megvan a db
//@EnableJpaRepositories("hu.bme.rental.persistence.repositories")
//@EntityScan("hu.bme.rental.persistence.models")
@EnableConfigurationProperties
@SpringBootApplication
// TODO	A swagger generált kódnak a package-t majd itt	(scanBasePackages = {"hu.bme.rental", "hu.bme.rental.api"})
public class RentalApplication {

	public static void main(String[] args) {
		log.info("Starting...............");
		SpringApplication.run(RentalApplication.class, args);
	}

	@PreDestroy
	public void tearDown() {
		log.info("Shutting Down...............");
	}
}
