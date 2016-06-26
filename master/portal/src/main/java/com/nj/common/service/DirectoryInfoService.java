package com.nj.common.service;

import com.nj.common.entity.DirectoryInfo;
import com.nj.common.manager.MasterManager;
import com.nj.common.response.Response;

public class DirectoryInfoService implements IDirectoryInfoService {

	private MasterManager masterManager;
	
	@Override
	public Response saveData(DirectoryInfo directoryInfo) {
		return getMasterManager().getDirectoryInfoManager().saveData(directoryInfo);
	}

	@Override
	public Response modifyData(DirectoryInfo directoryInfo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response getData(Long dId) {
		return getMasterManager().getDirectoryInfoManager().getData( dId );
	}

	public MasterManager getMasterManager() {
		return masterManager;
	}

	public void setMasterManager(MasterManager masterManager) {
		this.masterManager = masterManager;
	}

}
