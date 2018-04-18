package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterApp;

import io.github.jhipster.application.domain.Provincia;
import io.github.jhipster.application.repository.ProvinciaRepository;
import io.github.jhipster.application.service.ProvinciaService;
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
 * Test class for the ProvinciaResource REST controller.
 *
 * @see ProvinciaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ProvinciaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PREFISSO = "AAAAAAAAAA";
    private static final String UPDATED_PREFISSO = "BBBBBBBBBB";

    private static final String DEFAULT_CODICE = "AAAAAAAAAA";
    private static final String UPDATED_CODICE = "BBBBBBBBBB";

    private static final Long DEFAULT_ABITANTI = 1L;
    private static final Long UPDATED_ABITANTI = 2L;

    private static final Double DEFAULT_AREA = 1D;
    private static final Double UPDATED_AREA = 2D;

    @Autowired
    private ProvinciaRepository provinciaRepository;

    @Autowired
    private ProvinciaService provinciaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProvinciaMockMvc;

    private Provincia provincia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProvinciaResource provinciaResource = new ProvinciaResource(provinciaService);
        this.restProvinciaMockMvc = MockMvcBuilders.standaloneSetup(provinciaResource)
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
    public static Provincia createEntity(EntityManager em) {
        Provincia provincia = new Provincia()
            .nome(DEFAULT_NOME)
            .prefisso(DEFAULT_PREFISSO)
            .codice(DEFAULT_CODICE)
            .abitanti(DEFAULT_ABITANTI)
            .area(DEFAULT_AREA);
        return provincia;
    }

    @Before
    public void initTest() {
        provincia = createEntity(em);
    }

    @Test
    @Transactional
    public void createProvincia() throws Exception {
        int databaseSizeBeforeCreate = provinciaRepository.findAll().size();

        // Create the Provincia
        restProvinciaMockMvc.perform(post("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincia)))
            .andExpect(status().isCreated());

        // Validate the Provincia in the database
        List<Provincia> provinciaList = provinciaRepository.findAll();
        assertThat(provinciaList).hasSize(databaseSizeBeforeCreate + 1);
        Provincia testProvincia = provinciaList.get(provinciaList.size() - 1);
        assertThat(testProvincia.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProvincia.getPrefisso()).isEqualTo(DEFAULT_PREFISSO);
        assertThat(testProvincia.getCodice()).isEqualTo(DEFAULT_CODICE);
        assertThat(testProvincia.getAbitanti()).isEqualTo(DEFAULT_ABITANTI);
        assertThat(testProvincia.getArea()).isEqualTo(DEFAULT_AREA);
    }

    @Test
    @Transactional
    public void createProvinciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = provinciaRepository.findAll().size();

        // Create the Provincia with an existing ID
        provincia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvinciaMockMvc.perform(post("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincia)))
            .andExpect(status().isBadRequest());

        // Validate the Provincia in the database
        List<Provincia> provinciaList = provinciaRepository.findAll();
        assertThat(provinciaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProvincias() throws Exception {
        // Initialize the database
        provinciaRepository.saveAndFlush(provincia);

        // Get all the provinciaList
        restProvinciaMockMvc.perform(get("/api/provincias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(provincia.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].prefisso").value(hasItem(DEFAULT_PREFISSO.toString())))
            .andExpect(jsonPath("$.[*].codice").value(hasItem(DEFAULT_CODICE.toString())))
            .andExpect(jsonPath("$.[*].abitanti").value(hasItem(DEFAULT_ABITANTI.intValue())))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())));
    }

    @Test
    @Transactional
    public void getProvincia() throws Exception {
        // Initialize the database
        provinciaRepository.saveAndFlush(provincia);

        // Get the provincia
        restProvinciaMockMvc.perform(get("/api/provincias/{id}", provincia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(provincia.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.prefisso").value(DEFAULT_PREFISSO.toString()))
            .andExpect(jsonPath("$.codice").value(DEFAULT_CODICE.toString()))
            .andExpect(jsonPath("$.abitanti").value(DEFAULT_ABITANTI.intValue()))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProvincia() throws Exception {
        // Get the provincia
        restProvinciaMockMvc.perform(get("/api/provincias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProvincia() throws Exception {
        // Initialize the database
        provinciaService.save(provincia);

        int databaseSizeBeforeUpdate = provinciaRepository.findAll().size();

        // Update the provincia
        Provincia updatedProvincia = provinciaRepository.findOne(provincia.getId());
        // Disconnect from session so that the updates on updatedProvincia are not directly saved in db
        em.detach(updatedProvincia);
        updatedProvincia
            .nome(UPDATED_NOME)
            .prefisso(UPDATED_PREFISSO)
            .codice(UPDATED_CODICE)
            .abitanti(UPDATED_ABITANTI)
            .area(UPDATED_AREA);

        restProvinciaMockMvc.perform(put("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProvincia)))
            .andExpect(status().isOk());

        // Validate the Provincia in the database
        List<Provincia> provinciaList = provinciaRepository.findAll();
        assertThat(provinciaList).hasSize(databaseSizeBeforeUpdate);
        Provincia testProvincia = provinciaList.get(provinciaList.size() - 1);
        assertThat(testProvincia.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProvincia.getPrefisso()).isEqualTo(UPDATED_PREFISSO);
        assertThat(testProvincia.getCodice()).isEqualTo(UPDATED_CODICE);
        assertThat(testProvincia.getAbitanti()).isEqualTo(UPDATED_ABITANTI);
        assertThat(testProvincia.getArea()).isEqualTo(UPDATED_AREA);
    }

    @Test
    @Transactional
    public void updateNonExistingProvincia() throws Exception {
        int databaseSizeBeforeUpdate = provinciaRepository.findAll().size();

        // Create the Provincia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProvinciaMockMvc.perform(put("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincia)))
            .andExpect(status().isCreated());

        // Validate the Provincia in the database
        List<Provincia> provinciaList = provinciaRepository.findAll();
        assertThat(provinciaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProvincia() throws Exception {
        // Initialize the database
        provinciaService.save(provincia);

        int databaseSizeBeforeDelete = provinciaRepository.findAll().size();

        // Get the provincia
        restProvinciaMockMvc.perform(delete("/api/provincias/{id}", provincia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Provincia> provinciaList = provinciaRepository.findAll();
        assertThat(provinciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Provincia.class);
        Provincia provincia1 = new Provincia();
        provincia1.setId(1L);
        Provincia provincia2 = new Provincia();
        provincia2.setId(provincia1.getId());
        assertThat(provincia1).isEqualTo(provincia2);
        provincia2.setId(2L);
        assertThat(provincia1).isNotEqualTo(provincia2);
        provincia1.setId(null);
        assertThat(provincia1).isNotEqualTo(provincia2);
    }
}
