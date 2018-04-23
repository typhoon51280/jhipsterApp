package com.demo.app.security;

import java.util.stream.*;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		if ("user".equalsIgnoreCase(username) && "user.123".equals(password)) {
			return new UsernamePasswordAuthenticationToken(username, password, Stream.of(AuthoritiesConstants.USER).map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
		} else return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
