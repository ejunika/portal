package com.nj.util;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class HibernateDAO extends HibernateTemplate {
	protected Session session;
	protected Transaction transaction;
	protected Criteria criteria;
	
	public Boolean create(Object entity) {
		Boolean result = false;
		try {
			session = getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.save(entity);
			transaction.commit();
			result = true;
		}
		catch( Exception e ) {
			e.printStackTrace();
			transaction.rollback();
		}
		finally {
			session.close();
		}
		return result;
	}

	public Boolean modify(Object entity) {
		Boolean result = false;
		try {
			session = getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.update( entity );
			result = true;
			transaction.commit();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
		finally {
			session.close();
		}
		return result;
	}
	
	public Boolean remove(Object entity) {
		Boolean result = false;
		try {
			session = getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.delete(entity);
			transaction.commit();
			result = true;
		}
		catch( Exception e ) {
			e.printStackTrace();
			transaction.rollback();
		}
		finally {
			session.close();
		}
		return result;
	}
	
}
