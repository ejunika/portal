package com.nj.common.service;

import com.nj.common.entity.Login;
import com.nj.common.manager.MasterManager;
import com.nj.common.response.Response;

public class LoginService implements ILoginService {
	
	private MasterManager masterManager;
	
	@Override
	public Response register(Login login) {
		return getMasterManager().getLoginManager().register(login);
	}

	@Override
	public Response doLogin(Login login) {
		return getMasterManager().getLoginManager().doLogin(login);
	}

	@Override
	public Response getLoginById(Long id) {
		return getMasterManager().getLoginManager().getLoginById(id);
	}

	@Override
	public Response getLoginByEmailId(String emailId) {
		return getMasterManager().getLoginManager().getLoginByEmailId(emailId);
	}

	@Override
	public Response getLoginByStatus(Byte status) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response blockLogin(Long id) {
		return getMasterManager().getLoginManager().blockLogin(id);
	}

	@Override
	public Response unBlockLogin(Long id) {
		return getMasterManager().getLoginManager().unBlockLogin(id);
	}

	@Override
	public Response approveLogin(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response getAllLogin() {
		return getMasterManager().getLoginManager().getAllLogin();
	}
	
	public MasterManager getMasterManager() {
		return masterManager;
	}

	public void setMasterManager(MasterManager masterManager) {
		this.masterManager = masterManager;
	}


}
