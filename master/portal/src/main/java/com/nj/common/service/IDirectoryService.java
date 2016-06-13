package com.nj.common.service;

import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nj.common.entity.Directory;
import com.nj.common.response.Response;

@WebService
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public interface IDirectoryService {
	
	@GET
	@Path( "getByParent/{pId}")
	public Response getByParentId( @PathParam("pId") Long pId );
	
	@POST
	@Path( "create" )
	Response create( Directory directory );
	
	@GET
	@Path( "getAll" )
	Response getAll();
	
}
