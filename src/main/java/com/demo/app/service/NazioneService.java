package com.demo.app.service;

import com.demo.app.domain.Nazione;
import com.demo.app.repository.NazioneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Nazione.
 */
@Service
@Transactional
public class NazioneService {

    private final Logger log = LoggerFactory.getLogger(NazioneService.class);

    private final NazioneRepository nazioneRepository;

    public NazioneService(NazioneRepository nazioneRepository) {
        this.nazioneRepository = nazioneRepository;
    }

    /**
     * Save a nazione.
     *
     * @param nazione the entity to save
     * @return the persisted entity
     */
    public Nazione save(Nazione nazione) {
        log.debug("Request to save Nazione : {}", nazione);
        return nazioneRepository.save(nazione);
    }

    /**
     * Get all the naziones.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Nazione> findAll(Pageable pageable) {
        log.debug("Request to get all Naziones");
        return nazioneRepository.findAll(pageable);
    }


    /**
     * Get one nazione by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Nazione> findOne(Long id) {
        log.debug("Request to get Nazione : {}", id);
        return nazioneRepository.findById(id);
    }

    /**
     * Delete the nazione by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Nazione : {}", id);
        nazioneRepository.deleteById(id);
    }
}
