package com.nj.common.response;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Response {

	private Object data;
	
	private String info;
	
	private Boolean status;

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
}
