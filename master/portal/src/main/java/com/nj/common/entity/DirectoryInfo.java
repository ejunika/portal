package com.nj.common.entity;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class DirectoryInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String jsonData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}
