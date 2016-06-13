package com.nj.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table( name="LOGIN" )
@XmlRootElement
public class Login {
	
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	@Column( name="ID" )
	private Long id;
	
	@Column( name="STATUS" )
	private Byte status;
	
	@Column( name="F_NAME" )
	private String fName;
	
	@Column( name="M_NAME" )
	private String mName;
	
	@Column( name="L_NAME" )
	private String lName;
	
	@Column( name="MOBILE" )
	private String mobile;
	
	@Column( name="EMAIL_ID" )
	private String emailId;
	
	@Column( name="PASSWORD" )
	private String password;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getEmailId() {
		return emailId;
	}
	
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
