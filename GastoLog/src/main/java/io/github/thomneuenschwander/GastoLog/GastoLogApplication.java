package io.github.thomneuenschwander.GastoLog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GastoLogApplication {

	public static void main(String[] args) {
		SpringApplication.run(GastoLogApplication.class, args);
	}

}
