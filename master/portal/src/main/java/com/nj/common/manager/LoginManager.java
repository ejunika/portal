package com.nj.common.manager;

import java.util.List;

import com.nj.common.dao.LoginDAO;
import com.nj.common.entity.Login;
import com.nj.common.response.Response;

public class LoginManager {
	private LoginDAO loginDAO;
	private List<Login> list;
	private Response response;
	public LoginDAO getLoginDAO() {
		return loginDAO;
	}
	public void setLoginDAO(LoginDAO loginDAO) {
		this.loginDAO = loginDAO;
	}
	public List<Login> getList() {
		return list;
	}
	public void setList(List<Login> list) {
		this.list = list;
	}
	public Response getResponse() {
		return response;
	}
	public void setResponse(Response response) {
		this.response = response;
	}
	
	public Response register( Login login ) {
		getList().clear();
		if( getLoginDAO().create(login) ) {
			getList().add( login );
			getResponse().setData( getList() );
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response doLogin( Login login ) {
		return getResponse();
	}
	
	public Response remove( Login login ) {
		return getResponse();
	}
	
	public Response getAllLogin() {
		List<Object> allLogins = getLoginDAO().getAll();
		if( !allLogins.isEmpty() ) {
			getResponse().setData( allLogins );
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response getLoginById( Long id ) {
		return getResponse();
	}
	
	public Response getLoginByEmailId( String eId ) {
		return getResponse();
	}
	
	public Response blockLogin( Long id ) {
		return getResponse();
	}
	
	public Response unBlockLogin( Long id ) {
		return getResponse();
	}
}
