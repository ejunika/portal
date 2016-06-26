package com.nj.common.service;

import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nj.common.entity.DirectoryInfo;
import com.nj.common.response.Response;

@WebService
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public interface IDirectoryInfoService {

	@POST
	@Path( "saveData" )
	public Response saveData( DirectoryInfo directoryInfo );
	
	@PUT
	@Path( "modifyData" )
	public Response modifyData( DirectoryInfo directoryInfo );
	
	@GET
	@Path( "getData/{dId}" )
	public Response getData( @PathParam( "dId" ) Long dId );
	
}
