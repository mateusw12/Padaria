package com.padaria.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.service.contexts.SecurityContext;

import java.util.Arrays;
import java.util.List;

// rota swagger: http://localhost:8080/swagger-ui/index.html

@Configuration
public class SwagerConfiguration {

    private final String API_NAME = "Padaria API";
    private final String API_DESCRIPTION = "A API de Padaria é projetada para fornecer uma interface" +
            " de programação de aplicativos (API) para gerenciar os dados de uma padaria. " +
            "Ela permite que os desenvolvedores criem aplicativos que" +
            " possam realizar operações CRUD (criar, ler, atualizar e excluir) " +
            "em dados de padaria, como produtos, pedidos e clientes. " +
            "A API é segura, usando o padrão de segurança OAuth2," +
            " e está disponível em diferentes formatos, como JSON e XML." +
            " Através da documentação do Swagger, " +
            "os desenvolvedores podem entender facilmente as operações disponíveis e como utilizá-las," +
            " além de poder testar as chamadas na própria documentação.";
    private final String API_VERSION = "1.0";
    private final String API_CONTACT_NAME = "Mateus Walz";
    private final String API_CONTACT_URL = "https://github.com/mateusw12";
    private final String API_CONTACT_EMAIL = "mateus.walz@gmail.com";
    private final String API_LICENSE_NAME = "Apache 2.0";
    private final String API_LICENSE_URL = "http://springdoc.org";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title(API_NAME)
                        .version(API_VERSION)
                        .description(API_DESCRIPTION)
                        .contact(new Contact()
                                .name(API_CONTACT_NAME)
                                .url(API_CONTACT_URL)
                                .email(API_CONTACT_EMAIL))
                        .license(new License()
                                .name(API_LICENSE_NAME)
                                .url(API_LICENSE_URL)));
    }

    @Bean
    public SecurityScheme apiKey() {
        return new ApiKey("apiKey", "Authorization", "header");
    }

    @Bean
    public SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("/api/.*"))
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[]{authorizationScope};
        return Arrays.asList(new SecurityReference("apiKey", authorizationScopes));
    }

}