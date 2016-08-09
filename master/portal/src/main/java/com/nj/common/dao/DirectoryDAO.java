package com.nj.common.dao;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.nj.common.entity.Directory;
import com.nj.common.entity.Login;
import com.nj.util.HibernateDAO;
import com.nj.util.PortalStatus;

public class DirectoryDAO extends HibernateDAO implements IDirectoryDAO {
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAll() {
		List<Object> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Directory.class );
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

	@Override
	public Object getById(Long id) {
		Object entity = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Directory.class );
			criteria.add( Restrictions.eq( "id", id ) );
			entity = criteria.uniqueResult();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
		finally {
			session.close();
		}
		return entity;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getByParentId(Object entity) {
		List<Object> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Directory.class );
			criteria.add(Restrictions.eq( "parent", entity ) );
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
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getByType( Byte type ) {
		List<Object> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Directory.class );
			criteria.add(Restrictions.eq( "type", type ) );
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

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getRootDirectories( Login login ) {
		List<Object> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Directory.class );
			criteria.add(Restrictions.eq( "type", PortalStatus.ROOT_FOLDER ) );
			criteria.add(Restrictions.eq( "owner", login ) );
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
