package com.nj.common.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@Table( name="DIRECTORY" )
public class Directory {
	@Id
	@GeneratedValue( strategy=GenerationType.AUTO )
	@Column( name="ID" )
	private Long id;
	
	@Column( name="TYPE" )
	private Byte type;
	
	@Column( name="STATUS" )
	private Byte status;
	
	@ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST )
	@JoinColumn( name = "PARENT_ID" )
	private Directory parent;
	
	@Column( name="LABEL" )
	private String label;
	
	@Column( name="DESCRIPTION" )
	private String description;
	
	@Column( name="LAST_MODIFIED" )
	private Long lastModified;
	
	@Column( name="CREATION_TIME" )
	private Long creationTime;
	
	@Column( name="ICON_PATH" )
	private String iconPath;
	
	@Column( name="ICON_CLASS" )
	private String iconClass;
	
	@ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST )
	@JoinColumn( name = "OWNER" )
	private Login owner;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Byte getType() {
		return type;
	}
	
	public void setType(Byte type) {
		this.type = type;
	}
	
	public Byte getStatus() {
		return status;
	}
	
	public void setStatus(Byte status) {
		this.status = status;
	}
	
	public Directory getParent() {
		return parent;
	}
	
	public void setParent(Directory parent) {
		this.parent = parent;
	}
	
	public String getLabel() {
		return label;
	}
	
	public void setLabel(String label) {
		this.label = label;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Long getLastModified() {
		return lastModified;
	}
	
	public void setLastModified(Long lastModified) {
		this.lastModified = lastModified;
	}
	
	public Long getCreationTime() {
		return creationTime;
	}
	
	public void setCreationTime(Long creationTime) {
		this.creationTime = creationTime;
	}
	
	public String getIconPath() {
		return iconPath;
	}
	
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}
	
	public String getIconClass() {
		return iconClass;
	}
	
	public void setIconClass(String iconClass) {
		this.iconClass = iconClass;
	}

	public Login getOwner() {
		return owner;
	}

	public void setOwner(Login owner) {
		this.owner = owner;
	}
	
}
