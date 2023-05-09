package project.library.security.config;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import project.library.security.UserSecurity.dao.JpaUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final JpaUserDetailsService jpaUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                                .requestMatchers("api/v1/libraries/**").hasRole("MOD")
                                .requestMatchers("api/v1/roles/**").hasRole("MOD")
                                .requestMatchers(HttpMethod.DELETE, "api/v1/orders/**").hasRole("MOD")

                                .requestMatchers(HttpMethod.POST, "api/v1/categories/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.PUT, "api/v1/categories/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.DELETE, "api/v1/categories/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.GET, "api/v1/categories/**").permitAll()

                                .requestMatchers(HttpMethod.POST, "api/v1/books/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.PUT, "api/v1/books/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.DELETE, "api/v1/books/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.GET, "api/v1/books/**").permitAll()

                                .requestMatchers(HttpMethod.POST, "api/v1/orders/**").hasAnyRole("USER","ADMIN","MOD")
                                .requestMatchers(HttpMethod.PUT, "api/v1/orders/**").hasAnyRole("USER","ADMIN","MOD")
                                .requestMatchers(HttpMethod.GET, "api/v1/orders/**").hasAnyRole("USER","ADMIN","MOD")

                                .requestMatchers(HttpMethod.PUT,"api/v1/members/**").hasAnyRole("USER","ADMIN","MOD")
                                .requestMatchers(HttpMethod.DELETE,"api/v1/members/**").hasAnyRole("ADMIN","MOD")
                                .requestMatchers(HttpMethod.GET,"api/v1/members/**").permitAll()

                        .anyRequest()
                                .permitAll())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(jpaUserDetailsService.authenticationProvider())
                .userDetailsService(jpaUserDetailsService.userDetailsService())
                .build();
    }
}
