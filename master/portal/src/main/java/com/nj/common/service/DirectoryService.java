package com.nj.common.service;

import com.nj.common.entity.Directory;
import com.nj.common.manager.MasterManager;
import com.nj.common.response.Response;

public class DirectoryService implements IDirectoryService {

    private MasterManager masterManager;

    @Override
    public Response create(Directory directory) {
        return getMasterManager().getDirectoryManager().createDirectory(directory);
    }

    @Override
    public Response getAll() {
        return getMasterManager().getDirectoryManager().getAllDirectories();
    }

    @Override
    public Response getByParentId(Long pId) {
        return getMasterManager().getDirectoryManager().getByParentId( pId );
    }
    

    @Override
    public Response getAllFilesAndFolders() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Response getAllWorkspacesAndDashboards() {
        // TODO Auto-generated method stub
        return null;
    }

    public MasterManager getMasterManager() {
        return masterManager;
    }
    
    public void setMasterManager(MasterManager masterManager) {
        this.masterManager = masterManager;
    }
}
