package com.nj.common.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table( name = "DIRECTORY_INFO" )
@XmlRootElement
public class DirectoryInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column( name = "ID" )
    @GeneratedValue( strategy = GenerationType.AUTO )
    private Long id;
    
    @Column( name = "DATA" )
    @Lob
    private String data;
    
    @OneToOne( cascade = CascadeType.ALL )
    @JoinColumn( name = "DIRECTORY_ID" )
    private Directory directory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

	public Directory getDirectory() {
		return directory;
	}

	public void setDirectory(Directory directory) {
		this.directory = directory;
	}
}
