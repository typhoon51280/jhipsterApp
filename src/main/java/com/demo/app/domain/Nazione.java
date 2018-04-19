package com.demo.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Nazione.
 */
@Entity
@Table(name = "nazione")
public class Nazione implements Serializable {

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

    @Column(name = "codice_lingua")
    private String codiceLingua;

    @OneToMany(mappedBy = "nazione")
    private Set<Regione> regionis = new HashSet<>();

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

    public Nazione nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPrefisso() {
        return prefisso;
    }

    public Nazione prefisso(String prefisso) {
        this.prefisso = prefisso;
        return this;
    }

    public void setPrefisso(String prefisso) {
        this.prefisso = prefisso;
    }

    public String getCodice() {
        return codice;
    }

    public Nazione codice(String codice) {
        this.codice = codice;
        return this;
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }

    public String getCodiceLingua() {
        return codiceLingua;
    }

    public Nazione codiceLingua(String codiceLingua) {
        this.codiceLingua = codiceLingua;
        return this;
    }

    public void setCodiceLingua(String codiceLingua) {
        this.codiceLingua = codiceLingua;
    }

    public Set<Regione> getRegionis() {
        return regionis;
    }

    public Nazione regionis(Set<Regione> regiones) {
        this.regionis = regiones;
        return this;
    }

    public Nazione addRegioni(Regione regione) {
        this.regionis.add(regione);
        regione.setNazione(this);
        return this;
    }

    public Nazione removeRegioni(Regione regione) {
        this.regionis.remove(regione);
        regione.setNazione(null);
        return this;
    }

    public void setRegionis(Set<Regione> regiones) {
        this.regionis = regiones;
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
        Nazione nazione = (Nazione) o;
        if (nazione.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nazione.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Nazione{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", prefisso='" + getPrefisso() + "'" +
            ", codice='" + getCodice() + "'" +
            ", codiceLingua='" + getCodiceLingua() + "'" +
            "}";
    }
}
