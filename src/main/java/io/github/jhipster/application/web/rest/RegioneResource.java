package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Regione;
import io.github.jhipster.application.service.RegioneService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Regione.
 */
@RestController
@RequestMapping("/api")
public class RegioneResource {

    private final Logger log = LoggerFactory.getLogger(RegioneResource.class);

    private static final String ENTITY_NAME = "regione";

    private final RegioneService regioneService;

    public RegioneResource(RegioneService regioneService) {
        this.regioneService = regioneService;
    }

    /**
     * POST  /regiones : Create a new regione.
     *
     * @param regione the regione to create
     * @return the ResponseEntity with status 201 (Created) and with body the new regione, or with status 400 (Bad Request) if the regione has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/regiones")
    @Timed
    public ResponseEntity<Regione> createRegione(@RequestBody Regione regione) throws URISyntaxException {
        log.debug("REST request to save Regione : {}", regione);
        if (regione.getId() != null) {
            throw new BadRequestAlertException("A new regione cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Regione result = regioneService.save(regione);
        return ResponseEntity.created(new URI("/api/regiones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /regiones : Updates an existing regione.
     *
     * @param regione the regione to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated regione,
     * or with status 400 (Bad Request) if the regione is not valid,
     * or with status 500 (Internal Server Error) if the regione couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/regiones")
    @Timed
    public ResponseEntity<Regione> updateRegione(@RequestBody Regione regione) throws URISyntaxException {
        log.debug("REST request to update Regione : {}", regione);
        if (regione.getId() == null) {
            return createRegione(regione);
        }
        Regione result = regioneService.save(regione);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, regione.getId().toString()))
            .body(result);
    }

    /**
     * GET  /regiones : get all the regiones.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of regiones in body
     */
    @GetMapping("/regiones")
    @Timed
    public ResponseEntity<List<Regione>> getAllRegiones(Pageable pageable) {
        log.debug("REST request to get a page of Regiones");
        Page<Regione> page = regioneService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/regiones");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /regiones/:id : get the "id" regione.
     *
     * @param id the id of the regione to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the regione, or with status 404 (Not Found)
     */
    @GetMapping("/regiones/{id}")
    @Timed
    public ResponseEntity<Regione> getRegione(@PathVariable Long id) {
        log.debug("REST request to get Regione : {}", id);
        Regione regione = regioneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(regione));
    }

    /**
     * DELETE  /regiones/:id : delete the "id" regione.
     *
     * @param id the id of the regione to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/regiones/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegione(@PathVariable Long id) {
        log.debug("REST request to delete Regione : {}", id);
        regioneService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
