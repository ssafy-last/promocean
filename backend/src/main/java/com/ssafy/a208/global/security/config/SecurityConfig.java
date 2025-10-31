package com.ssafy.a208.global.security.config;


import com.ssafy.a208.global.security.filter.JwtFilter;
import com.ssafy.a208.global.security.handler.JwtAccessDeniedHandler;
import com.ssafy.a208.global.security.handler.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private static final String[] SWAGGER_URLS = {
            "/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**"
    };
    private static final String LOGIN_URL = "/api/v1/auth/login";
    private static final String IMAGE_URL = "/api/v1/images";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable);

        http.sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout(AbstractHttpConfigurer::disable);

        http.httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);

        http.exceptionHandling((exceptionHandling) ->
                exceptionHandling
                        .accessDeniedHandler(new JwtAccessDeniedHandler())
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
        );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(SWAGGER_URLS).permitAll()
                .requestMatchers(LOGIN_URL).permitAll()
                .requestMatchers(IMAGE_URL).permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/error").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }
}


