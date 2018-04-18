package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterApp;

import io.github.jhipster.application.domain.Nazione;
import io.github.jhipster.application.repository.NazioneRepository;
import io.github.jhipster.application.service.NazioneService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NazioneResource REST controller.
 *
 * @see NazioneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class NazioneResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PREFISSO = "AAAAAAAAAA";
    private static final String UPDATED_PREFISSO = "BBBBBBBBBB";

    private static final String DEFAULT_CODICE = "AAAAAAAAAA";
    private static final String UPDATED_CODICE = "BBBBBBBBBB";

    private static final String DEFAULT_CODICE_LINGUA = "AAAAAAAAAA";
    private static final String UPDATED_CODICE_LINGUA = "BBBBBBBBBB";

    @Autowired
    private NazioneRepository nazioneRepository;

    @Autowired
    private NazioneService nazioneService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNazioneMockMvc;

    private Nazione nazione;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NazioneResource nazioneResource = new NazioneResource(nazioneService);
        this.restNazioneMockMvc = MockMvcBuilders.standaloneSetup(nazioneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nazione createEntity(EntityManager em) {
        Nazione nazione = new Nazione()
            .nome(DEFAULT_NOME)
            .prefisso(DEFAULT_PREFISSO)
            .codice(DEFAULT_CODICE)
            .codiceLingua(DEFAULT_CODICE_LINGUA);
        return nazione;
    }

    @Before
    public void initTest() {
        nazione = createEntity(em);
    }

    @Test
    @Transactional
    public void createNazione() throws Exception {
        int databaseSizeBeforeCreate = nazioneRepository.findAll().size();

        // Create the Nazione
        restNazioneMockMvc.perform(post("/api/naziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nazione)))
            .andExpect(status().isCreated());

        // Validate the Nazione in the database
        List<Nazione> nazioneList = nazioneRepository.findAll();
        assertThat(nazioneList).hasSize(databaseSizeBeforeCreate + 1);
        Nazione testNazione = nazioneList.get(nazioneList.size() - 1);
        assertThat(testNazione.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testNazione.getPrefisso()).isEqualTo(DEFAULT_PREFISSO);
        assertThat(testNazione.getCodice()).isEqualTo(DEFAULT_CODICE);
        assertThat(testNazione.getCodiceLingua()).isEqualTo(DEFAULT_CODICE_LINGUA);
    }

    @Test
    @Transactional
    public void createNazioneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nazioneRepository.findAll().size();

        // Create the Nazione with an existing ID
        nazione.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNazioneMockMvc.perform(post("/api/naziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nazione)))
            .andExpect(status().isBadRequest());

        // Validate the Nazione in the database
        List<Nazione> nazioneList = nazioneRepository.findAll();
        assertThat(nazioneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNaziones() throws Exception {
        // Initialize the database
        nazioneRepository.saveAndFlush(nazione);

        // Get all the nazioneList
        restNazioneMockMvc.perform(get("/api/naziones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nazione.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].prefisso").value(hasItem(DEFAULT_PREFISSO.toString())))
            .andExpect(jsonPath("$.[*].codice").value(hasItem(DEFAULT_CODICE.toString())))
            .andExpect(jsonPath("$.[*].codiceLingua").value(hasItem(DEFAULT_CODICE_LINGUA.toString())));
    }

    @Test
    @Transactional
    public void getNazione() throws Exception {
        // Initialize the database
        nazioneRepository.saveAndFlush(nazione);

        // Get the nazione
        restNazioneMockMvc.perform(get("/api/naziones/{id}", nazione.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nazione.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.prefisso").value(DEFAULT_PREFISSO.toString()))
            .andExpect(jsonPath("$.codice").value(DEFAULT_CODICE.toString()))
            .andExpect(jsonPath("$.codiceLingua").value(DEFAULT_CODICE_LINGUA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNazione() throws Exception {
        // Get the nazione
        restNazioneMockMvc.perform(get("/api/naziones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNazione() throws Exception {
        // Initialize the database
        nazioneService.save(nazione);

        int databaseSizeBeforeUpdate = nazioneRepository.findAll().size();

        // Update the nazione
        Nazione updatedNazione = nazioneRepository.findOne(nazione.getId());
        // Disconnect from session so that the updates on updatedNazione are not directly saved in db
        em.detach(updatedNazione);
        updatedNazione
            .nome(UPDATED_NOME)
            .prefisso(UPDATED_PREFISSO)
            .codice(UPDATED_CODICE)
            .codiceLingua(UPDATED_CODICE_LINGUA);

        restNazioneMockMvc.perform(put("/api/naziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNazione)))
            .andExpect(status().isOk());

        // Validate the Nazione in the database
        List<Nazione> nazioneList = nazioneRepository.findAll();
        assertThat(nazioneList).hasSize(databaseSizeBeforeUpdate);
        Nazione testNazione = nazioneList.get(nazioneList.size() - 1);
        assertThat(testNazione.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testNazione.getPrefisso()).isEqualTo(UPDATED_PREFISSO);
        assertThat(testNazione.getCodice()).isEqualTo(UPDATED_CODICE);
        assertThat(testNazione.getCodiceLingua()).isEqualTo(UPDATED_CODICE_LINGUA);
    }

    @Test
    @Transactional
    public void updateNonExistingNazione() throws Exception {
        int databaseSizeBeforeUpdate = nazioneRepository.findAll().size();

        // Create the Nazione

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNazioneMockMvc.perform(put("/api/naziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nazione)))
            .andExpect(status().isCreated());

        // Validate the Nazione in the database
        List<Nazione> nazioneList = nazioneRepository.findAll();
        assertThat(nazioneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNazione() throws Exception {
        // Initialize the database
        nazioneService.save(nazione);

        int databaseSizeBeforeDelete = nazioneRepository.findAll().size();

        // Get the nazione
        restNazioneMockMvc.perform(delete("/api/naziones/{id}", nazione.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nazione> nazioneList = nazioneRepository.findAll();
        assertThat(nazioneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nazione.class);
        Nazione nazione1 = new Nazione();
        nazione1.setId(1L);
        Nazione nazione2 = new Nazione();
        nazione2.setId(nazione1.getId());
        assertThat(nazione1).isEqualTo(nazione2);
        nazione2.setId(2L);
        assertThat(nazione1).isNotEqualTo(nazione2);
        nazione1.setId(null);
        assertThat(nazione1).isNotEqualTo(nazione2);
    }
}
