package com.nj.common.manager;

import java.util.List;

import com.nj.common.dao.DirectoryDAO;
import com.nj.common.entity.Directory;
import com.nj.common.entity.Login;
import com.nj.common.response.Response;

public class DirectoryManager {

	private Response response;
	private DirectoryDAO directoryDAO;
	private Directory directory;
	private Login login;
	private List<Directory> list;
	
	public Response createDirectory( Directory directory ) {
		getList().clear();
		if( getDirectoryDAO().create(directory) ) {
			getList().add(directory);
			getResponse().setData(getList());
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response getAllDirectories() {
		getList().clear();
		List<Object> allDirectories = getDirectoryDAO().getAll();
		if( !allDirectories.isEmpty() ) {
			getResponse().setData(allDirectories);
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response getRootDirectories( Long loginId ) {
		getList().clear();
		getLogin().setId( loginId );
		List<Object> directories = getDirectoryDAO().getRootDirectories( getLogin() );
		if( !directories.isEmpty() ) {
			getResponse().setData(directories);
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response getByType( Byte type ) {
		getList().clear();
		List<Object> directories = getDirectoryDAO().getByType( type );
		if( !directories.isEmpty() ) {
			getResponse().setData(directories);
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}
	
	public Response getByParentId( Long pId ) {
		getList().clear();
		getDirectory().setId(pId);
		List<Object> directories = getDirectoryDAO().getByParentId(getDirectory());
		if( !directories.isEmpty() ) {
			getResponse().setData(directories);
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(false);
			getResponse().setInfo("Error");
		}
		return getResponse();
	}

	public DirectoryDAO getDirectoryDAO() {
		return directoryDAO;
	}

	public void setDirectoryDAO(DirectoryDAO directoryDAO) {
		this.directoryDAO = directoryDAO;
	}

	public Directory getDirectory() {
		return directory;
	}

	public void setDirectory(Directory directory) {
		this.directory = directory;
	}

	public Response getResponse() {
		return response;
	}

	public void setResponse(Response response) {
		this.response = response;
	}

	public List<Directory> getList() {
		return list;
	}

	public void setList(List<Directory> list) {
		this.list = list;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}
	
	
	
}
