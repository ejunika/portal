package com.nj.common.dao;

import java.util.List;

import com.nj.common.entity.Login;

public interface IDirectoryDAO extends ICommonDAO {
	List<Object> getByParentId( Object entity );
	List<Object> getRootDirectories( Login login );
	List<Object> getByType(Byte type);
}
