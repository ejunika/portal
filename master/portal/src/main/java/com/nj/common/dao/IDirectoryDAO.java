package com.nj.common.dao;

import java.util.List;

public interface IDirectoryDAO extends ICommonDAO {
	List<Object> getByParentId( Object entity );
	List<Object> getRootDirectories();
}
