package com.nj.common.interceptor;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;

import com.nj.common.auth.LoginAuthenticator;

public class AuthenticationInterceptor extends AbstractPhaseInterceptor< Message > {

    public AuthenticationInterceptor() {
        super( Phase.RECEIVE );
    }

    @SuppressWarnings("unchecked")
    @Override
    public void handleMessage( Message message ) throws Fault {
        Map< String, List< String > > headerMap = ( Map< String, List< String > > ) message.get( Message.PROTOCOL_HEADERS );
        if( !LoginAuthenticator.authenticate( headerMap ) ) {
            Response response = Response.status( Response.Status.BAD_REQUEST ).build();
            message.getExchange().put( Response.class, response );
        }
    }

}
