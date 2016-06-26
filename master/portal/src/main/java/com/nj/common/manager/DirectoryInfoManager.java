package com.nj.common.manager;

import java.util.List;

import com.nj.common.dao.DirectoryInfoDAO;
import com.nj.common.entity.Directory;
import com.nj.common.entity.DirectoryInfo;
import com.nj.common.response.Response;

public class DirectoryInfoManager {
	private DirectoryInfoDAO directoryInfoDAO;
	private Directory directory;
	private List< DirectoryInfo > list;
	private Response response;
	
	public Response saveData( DirectoryInfo directoryInfo ) {
		getList().clear();
		if( getDirectoryInfoDAO().create( directoryInfo ) ) {
			getList().add( directoryInfo );
			getResponse().setData( getList() );
			getResponse().setStatus( true );
			getResponse().setInfo( "Success" );
		}
		else {
			getResponse().setStatus( true );
			getResponse().setInfo( "Success" );
		}
		return getResponse();
	}
	
	public Response getData( Long id ) {
		getList().clear();
		getDirectory().setId( id );
		getList().addAll( getDirectoryInfoDAO().getData( getDirectory() ) );
		if( !getList().isEmpty() ) {
			getResponse().setData(getList());
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		else {
			getResponse().setStatus(true);
			getResponse().setInfo("Success");
		}
		return getResponse();
	}
	
	public DirectoryInfoDAO getDirectoryInfoDAO() {
		return directoryInfoDAO;
	}
	public void setDirectoryInfoDAO(DirectoryInfoDAO directoryInfoDAO) {
		this.directoryInfoDAO = directoryInfoDAO;
	}
	public List<DirectoryInfo> getList() {
		return list;
	}
	public void setList(List<DirectoryInfo> list) {
		this.list = list;
	}
	public Response getResponse() {
		return response;
	}
	public void setResponse(Response response) {
		this.response = response;
	}

	public Directory getDirectory() {
		return directory;
	}

	public void setDirectory(Directory directory) {
		this.directory = directory;
	}
	
}
