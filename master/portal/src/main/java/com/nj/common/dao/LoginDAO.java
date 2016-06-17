package com.nj.common.dao;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.nj.common.entity.Login;
import com.nj.util.HibernateDAO;

public class LoginDAO extends HibernateDAO implements ILoginDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAll() {
		List<Object> list = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Login.class );
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
			criteria = session.createCriteria( Login.class );
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

	public Login getByEmailId(String emailId) {
		Login login = null;
		try {
			session = getSessionFactory().openSession();
			criteria = session.createCriteria( Login.class );
			criteria.add( Restrictions.eq( "emailId", emailId ) );
			login = (Login) criteria.uniqueResult();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
		finally {
			session.close();
		}
		return login;
	}

}
