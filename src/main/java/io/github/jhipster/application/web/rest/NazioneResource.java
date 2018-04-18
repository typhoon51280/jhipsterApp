package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Nazione;
import io.github.jhipster.application.service.NazioneService;
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
 * REST controller for managing Nazione.
 */
@RestController
@RequestMapping("/api")
public class NazioneResource {

    private final Logger log = LoggerFactory.getLogger(NazioneResource.class);

    private static final String ENTITY_NAME = "nazione";

    private final NazioneService nazioneService;

    public NazioneResource(NazioneService nazioneService) {
        this.nazioneService = nazioneService;
    }

    /**
     * POST  /naziones : Create a new nazione.
     *
     * @param nazione the nazione to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nazione, or with status 400 (Bad Request) if the nazione has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/naziones")
    @Timed
    public ResponseEntity<Nazione> createNazione(@RequestBody Nazione nazione) throws URISyntaxException {
        log.debug("REST request to save Nazione : {}", nazione);
        if (nazione.getId() != null) {
            throw new BadRequestAlertException("A new nazione cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nazione result = nazioneService.save(nazione);
        return ResponseEntity.created(new URI("/api/naziones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /naziones : Updates an existing nazione.
     *
     * @param nazione the nazione to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nazione,
     * or with status 400 (Bad Request) if the nazione is not valid,
     * or with status 500 (Internal Server Error) if the nazione couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/naziones")
    @Timed
    public ResponseEntity<Nazione> updateNazione(@RequestBody Nazione nazione) throws URISyntaxException {
        log.debug("REST request to update Nazione : {}", nazione);
        if (nazione.getId() == null) {
            return createNazione(nazione);
        }
        Nazione result = nazioneService.save(nazione);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nazione.getId().toString()))
            .body(result);
    }

    /**
     * GET  /naziones : get all the naziones.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of naziones in body
     */
    @GetMapping("/naziones")
    @Timed
    public ResponseEntity<List<Nazione>> getAllNaziones(Pageable pageable) {
        log.debug("REST request to get a page of Naziones");
        Page<Nazione> page = nazioneService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/naziones");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /naziones/:id : get the "id" nazione.
     *
     * @param id the id of the nazione to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nazione, or with status 404 (Not Found)
     */
    @GetMapping("/naziones/{id}")
    @Timed
    public ResponseEntity<Nazione> getNazione(@PathVariable Long id) {
        log.debug("REST request to get Nazione : {}", id);
        Nazione nazione = nazioneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nazione));
    }

    /**
     * DELETE  /naziones/:id : delete the "id" nazione.
     *
     * @param id the id of the nazione to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/naziones/{id}")
    @Timed
    public ResponseEntity<Void> deleteNazione(@PathVariable Long id) {
        log.debug("REST request to delete Nazione : {}", id);
        nazioneService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
