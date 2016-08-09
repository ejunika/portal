package com.nj.common.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;

public class AuthenticationFilter implements ContainerRequestFilter {

	@Override
	public void filter(ContainerRequestContext containerRequestContext) throws IOException {
		@SuppressWarnings("unused")
		String authToken = containerRequestContext.getHeaderString( "AUTH-TOKEN" );
	}

}
