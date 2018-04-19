package com.demo.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Regione.
 */
@Entity
@Table(name = "regione")
public class Regione implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "abitanti")
    private Long abitanti;

    @Column(name = "area")
    private Double area;

    @OneToMany(mappedBy = "regione")
    private Set<Provincia> provinces = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("regionis")
    private Nazione nazione;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Regione nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getAbitanti() {
        return abitanti;
    }

    public Regione abitanti(Long abitanti) {
        this.abitanti = abitanti;
        return this;
    }

    public void setAbitanti(Long abitanti) {
        this.abitanti = abitanti;
    }

    public Double getArea() {
        return area;
    }

    public Regione area(Double area) {
        this.area = area;
        return this;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Set<Provincia> getProvinces() {
        return provinces;
    }

    public Regione provinces(Set<Provincia> provincias) {
        this.provinces = provincias;
        return this;
    }

    public Regione addProvince(Provincia provincia) {
        this.provinces.add(provincia);
        provincia.setRegione(this);
        return this;
    }

    public Regione removeProvince(Provincia provincia) {
        this.provinces.remove(provincia);
        provincia.setRegione(null);
        return this;
    }

    public void setProvinces(Set<Provincia> provincias) {
        this.provinces = provincias;
    }

    public Nazione getNazione() {
        return nazione;
    }

    public Regione nazione(Nazione nazione) {
        this.nazione = nazione;
        return this;
    }

    public void setNazione(Nazione nazione) {
        this.nazione = nazione;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Regione regione = (Regione) o;
        if (regione.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), regione.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Regione{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", abitanti=" + getAbitanti() +
            ", area=" + getArea() +
            "}";
    }
}
