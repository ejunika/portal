package com.nj.common.manager;

public class MasterManager {

	private DirectoryInfoManager directoryInfoManager;
	private DirectoryManager directoryManager;
	private LoginManager loginManager;

	public DirectoryInfoManager getDirectoryInfoManager() {
		return directoryInfoManager;
	}
	
	public void setDirectoryInfoManager(DirectoryInfoManager directoryInfoManager) {
		this.directoryInfoManager = directoryInfoManager;
	}
	
	public DirectoryManager getDirectoryManager() {
		return directoryManager;
	}

	public void setDirectoryManager(DirectoryManager directoryManager) {
		this.directoryManager = directoryManager;
	}

	public LoginManager getLoginManager() {
		return loginManager;
	}

	public void setLoginManager(LoginManager loginManager) {
		this.loginManager = loginManager;
	}
	
}
