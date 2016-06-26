package com.nj.common.dao;

import java.util.List;

import com.nj.common.entity.Directory;
import com.nj.common.entity.DirectoryInfo;

public interface IDirectoryInfoDAO {
	List< DirectoryInfo > getData( Directory directory );
}
