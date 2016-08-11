package com.nj.common.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.util.password.StrongPasswordEncryptor;

public class LoginAuthenticator {
    public static Map<String, String> tokenMap = new HashMap<>();
    public static Boolean authenticate( String emailId, String password ) {
        Boolean success = false;
        tokenMap.put( emailId, generateToken( emailId, password ) );
        return success;
    }
    public static Boolean authenticate( Map< String, List< String> > headerMap ) {
        Boolean success = false;
        if( headerMap.get( "AUTH-TOKEN" ).get( 0 ).equals( "newAuthToken" ) ) {
            success = true;
        }
        return success;
        
    }
    public static String generateToken( String emailId, String password ) {
        String token = UUID.randomUUID().toString().toUpperCase() + "|" + emailId + "|" + password;
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        token = encryptor.encrypt( token );
        return token;
    }
    
    public static void main(String[] args) {
        String name = "abc";
        StrongPasswordEncryptor encryptor = new StrongPasswordEncryptor();
        name = encryptor.encryptPassword(name);
        System.out.println( name );
        System.out.println( encryptor.checkPassword("abc", "hEn228Ukc9k7eg+s3W7YmCrA/MqAEe6clcpmRHG40z7d4XRCF7dATsjauwsDnHtP"));
    }
}
