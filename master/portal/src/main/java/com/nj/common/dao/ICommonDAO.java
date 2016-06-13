package com.nj.common.dao;

import java.util.List;

public interface ICommonDAO {
	Boolean create( Object entity );
	Boolean modify( Object entity );
	Boolean remove( Object entity );
	List< Object > getAll();
	Object getById( Long id );
}
