package com.demo.app.repository;

import com.demo.app.domain.Regione;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Regione entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegioneRepository extends JpaRepository<Regione, Long> {

}
