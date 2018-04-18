package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Nazione;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Nazione entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NazioneRepository extends JpaRepository<Nazione, Long> {

}
