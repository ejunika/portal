package com.nj.common.service;

import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nj.common.entity.Login;
import com.nj.common.response.Response;

@WebService
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public interface ILoginService {

	@POST
	@Path( "register" )
	Response register( Login login );
	
	@POST
	@Path( "doLogin" )
	Response doLogin( Login login );
	
	@GET
	@Path( "getAll" )
	Response getAllLogin();
	
	@GET
	@Path( "getById/{lId}" )
	Response getLoginById( @PathParam( "lId" ) Long id );
	
	@GET
	@Path( "getByEmailId/{eId}" )
	Response getLoginByEmailId( @PathParam( "eId" ) String emailId );
	
	@GET
	@Path( "getByStatus/{status}" )
	Response getLoginByStatus( @PathParam( "status" ) Byte status );
	
	@GET
	@Path( "blockLogin/{lId}" )
	Response blockLogin( @PathParam( "lId" ) Long id );
	
	@GET
	@Path( "unBlockLogin/{lId}" )
	Response unBlockLogin( @PathParam( "lId" ) Long id );
	
	@GET
	@Path( "approveLogin/{lId}" )
	Response approveLogin( @PathParam( "lId" ) Long id );
		
}
