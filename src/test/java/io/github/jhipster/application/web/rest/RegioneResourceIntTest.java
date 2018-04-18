package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterApp;

import io.github.jhipster.application.domain.Regione;
import io.github.jhipster.application.repository.RegioneRepository;
import io.github.jhipster.application.service.RegioneService;
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
 * Test class for the RegioneResource REST controller.
 *
 * @see RegioneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class RegioneResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Long DEFAULT_ABITANTI = 1L;
    private static final Long UPDATED_ABITANTI = 2L;

    private static final Double DEFAULT_AREA = 1D;
    private static final Double UPDATED_AREA = 2D;

    @Autowired
    private RegioneRepository regioneRepository;

    @Autowired
    private RegioneService regioneService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegioneMockMvc;

    private Regione regione;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RegioneResource regioneResource = new RegioneResource(regioneService);
        this.restRegioneMockMvc = MockMvcBuilders.standaloneSetup(regioneResource)
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
    public static Regione createEntity(EntityManager em) {
        Regione regione = new Regione()
            .nome(DEFAULT_NOME)
            .abitanti(DEFAULT_ABITANTI)
            .area(DEFAULT_AREA);
        return regione;
    }

    @Before
    public void initTest() {
        regione = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegione() throws Exception {
        int databaseSizeBeforeCreate = regioneRepository.findAll().size();

        // Create the Regione
        restRegioneMockMvc.perform(post("/api/regiones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regione)))
            .andExpect(status().isCreated());

        // Validate the Regione in the database
        List<Regione> regioneList = regioneRepository.findAll();
        assertThat(regioneList).hasSize(databaseSizeBeforeCreate + 1);
        Regione testRegione = regioneList.get(regioneList.size() - 1);
        assertThat(testRegione.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testRegione.getAbitanti()).isEqualTo(DEFAULT_ABITANTI);
        assertThat(testRegione.getArea()).isEqualTo(DEFAULT_AREA);
    }

    @Test
    @Transactional
    public void createRegioneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = regioneRepository.findAll().size();

        // Create the Regione with an existing ID
        regione.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegioneMockMvc.perform(post("/api/regiones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regione)))
            .andExpect(status().isBadRequest());

        // Validate the Regione in the database
        List<Regione> regioneList = regioneRepository.findAll();
        assertThat(regioneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegiones() throws Exception {
        // Initialize the database
        regioneRepository.saveAndFlush(regione);

        // Get all the regioneList
        restRegioneMockMvc.perform(get("/api/regiones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regione.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].abitanti").value(hasItem(DEFAULT_ABITANTI.intValue())))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())));
    }

    @Test
    @Transactional
    public void getRegione() throws Exception {
        // Initialize the database
        regioneRepository.saveAndFlush(regione);

        // Get the regione
        restRegioneMockMvc.perform(get("/api/regiones/{id}", regione.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(regione.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.abitanti").value(DEFAULT_ABITANTI.intValue()))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRegione() throws Exception {
        // Get the regione
        restRegioneMockMvc.perform(get("/api/regiones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegione() throws Exception {
        // Initialize the database
        regioneService.save(regione);

        int databaseSizeBeforeUpdate = regioneRepository.findAll().size();

        // Update the regione
        Regione updatedRegione = regioneRepository.findOne(regione.getId());
        // Disconnect from session so that the updates on updatedRegione are not directly saved in db
        em.detach(updatedRegione);
        updatedRegione
            .nome(UPDATED_NOME)
            .abitanti(UPDATED_ABITANTI)
            .area(UPDATED_AREA);

        restRegioneMockMvc.perform(put("/api/regiones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegione)))
            .andExpect(status().isOk());

        // Validate the Regione in the database
        List<Regione> regioneList = regioneRepository.findAll();
        assertThat(regioneList).hasSize(databaseSizeBeforeUpdate);
        Regione testRegione = regioneList.get(regioneList.size() - 1);
        assertThat(testRegione.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testRegione.getAbitanti()).isEqualTo(UPDATED_ABITANTI);
        assertThat(testRegione.getArea()).isEqualTo(UPDATED_AREA);
    }

    @Test
    @Transactional
    public void updateNonExistingRegione() throws Exception {
        int databaseSizeBeforeUpdate = regioneRepository.findAll().size();

        // Create the Regione

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegioneMockMvc.perform(put("/api/regiones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regione)))
            .andExpect(status().isCreated());

        // Validate the Regione in the database
        List<Regione> regioneList = regioneRepository.findAll();
        assertThat(regioneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegione() throws Exception {
        // Initialize the database
        regioneService.save(regione);

        int databaseSizeBeforeDelete = regioneRepository.findAll().size();

        // Get the regione
        restRegioneMockMvc.perform(delete("/api/regiones/{id}", regione.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Regione> regioneList = regioneRepository.findAll();
        assertThat(regioneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Regione.class);
        Regione regione1 = new Regione();
        regione1.setId(1L);
        Regione regione2 = new Regione();
        regione2.setId(regione1.getId());
        assertThat(regione1).isEqualTo(regione2);
        regione2.setId(2L);
        assertThat(regione1).isNotEqualTo(regione2);
        regione1.setId(null);
        assertThat(regione1).isNotEqualTo(regione2);
    }
}
