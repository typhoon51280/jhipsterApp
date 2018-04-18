package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Provincia.
 */
@Entity
@Table(name = "provincia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Provincia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "prefisso")
    private String prefisso;

    @Column(name = "codice")
    private String codice;

    @Column(name = "abitanti")
    private Long abitanti;

    @Column(name = "area")
    private Double area;

    @ManyToOne
    private Regione regione;

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

    public Provincia nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPrefisso() {
        return prefisso;
    }

    public Provincia prefisso(String prefisso) {
        this.prefisso = prefisso;
        return this;
    }

    public void setPrefisso(String prefisso) {
        this.prefisso = prefisso;
    }

    public String getCodice() {
        return codice;
    }

    public Provincia codice(String codice) {
        this.codice = codice;
        return this;
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }

    public Long getAbitanti() {
        return abitanti;
    }

    public Provincia abitanti(Long abitanti) {
        this.abitanti = abitanti;
        return this;
    }

    public void setAbitanti(Long abitanti) {
        this.abitanti = abitanti;
    }

    public Double getArea() {
        return area;
    }

    public Provincia area(Double area) {
        this.area = area;
        return this;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Regione getRegione() {
        return regione;
    }

    public Provincia regione(Regione regione) {
        this.regione = regione;
        return this;
    }

    public void setRegione(Regione regione) {
        this.regione = regione;
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
        Provincia provincia = (Provincia) o;
        if (provincia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), provincia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Provincia{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", prefisso='" + getPrefisso() + "'" +
            ", codice='" + getCodice() + "'" +
            ", abitanti=" + getAbitanti() +
            ", area=" + getArea() +
            "}";
    }
}
