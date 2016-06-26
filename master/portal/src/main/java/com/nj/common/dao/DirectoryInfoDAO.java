package com.nj.common.dao;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.nj.common.entity.Directory;
import com.nj.common.entity.DirectoryInfo;
import com.nj.util.HibernateDAO;

public class DirectoryInfoDAO extends HibernateDAO implements IDirectoryInfoDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<DirectoryInfo> getData(Directory directory) {
		List<DirectoryInfo> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( DirectoryInfo.class );
			criteria.add(Restrictions.eq( "directory", directory ) );
			list = criteria.list();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
		finally {
			session.close();
		}
		return list;
	}

}
