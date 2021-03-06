package ru.gold.ordance.board.core.service;

import org.apache.logging.log4j.util.Strings;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import ru.gold.ordance.board.core.service.heir.ClientService;
import ru.gold.ordance.board.core.entity.Client;
import ru.gold.ordance.board.core.persistence.heir.ClientRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static ru.gold.ordance.board.common.utils.TestUtils.generateId;
import static ru.gold.ordance.board.common.utils.TestUtils.randomString;
import static ru.gold.ordance.board.core.utils.EntityGenerator.*;

@DataJpaTest(showSql = false)
@ActiveProfiles("test")
public class ClientServiceTest {

    @Autowired
    private ClientService service;

    @Autowired
    private ClientRepository repository;

    @Test
    public void findAll_noOneHasBeenFound() {
        int noOneHasBeenFound = 0;

        List<Client> found = service.findAll();

        assertEquals(noOneHasBeenFound, found.size());
    }

    @Test
    public void findAll_foundOne() {
        int foundOne = 1;
        repository.save(createClient());

        List<Client> found = service.findAll();

        assertEquals(foundOne, found.size());
    }

    @Test
    public void findAll_foundALot() {
        int foundALot = 2;
        repository.save(createClient());
        repository.save(createClient());

        List<Client> found = service.findAll();

        assertEquals(foundALot, found.size());
    }

    @Test
    public void findById_notFound() {
        long fakeId = generateId();

        Optional<Client> found = service.findById(fakeId);

        assertTrue(found.isEmpty());
    }

    @Test
    public void findById_found() {
        Client saved = repository.save(createClient());

        Optional<Client> found = service.findById(saved.getId());

        assertTrue(found.isPresent());
    }

    @Test
    public void findByLogin_notFound() {
        String fakeLogin = randomString();

        Optional<Client> found = service.findByLogin(fakeLogin);

        assertTrue(found.isEmpty());
    }

    @Test
    public void findByLogin_found() {
        Client saved = repository.save(createClient());

        Optional<Client> found = service.findByLogin(saved.getLogin());

        assertTrue(found.isPresent());
    }

    @Test
    public void update_saveClient() {
        Client created = createClient();

        Client saved = service.update(created).get();

        assertEquals(created, saved);
    }

    @Test
    public void update_updateClient() {
        Long entityId = repository.save(createClient()).getId();

        Client newObj = createClient();
        newObj.setId(entityId);

        Client updated = service.update(newObj).get();

        assertEquals(newObj.getId(), updated.getId());
        assertEquals(newObj.getName(), updated.getName());
    }

    @Test
    public void deleteById_clientExists() {
        Client saved = repository.save(createClient());

        service.deleteById(saved.getId());

        Optional<Client> found = repository.findById(saved.getId());

        assertTrue(found.isEmpty());
    }

    @Test
    public void findAllByName_notFound() {
        String fakeName = Strings.EMPTY;
        int noOneHasBeenFound = 0;

        List<Client> found = service.findAllByName(fakeName);

        assertEquals(noOneHasBeenFound, found.size());
    }

    @Test
    public void findAllByName_foundOne() {
        int foundOne = 1;
        Client saved = repository.save(createClient());
        repository.save(createClient());

        List<Client> found = service.findAllByName(saved.getName());

        assertEquals(foundOne, found.size());
    }

    @Test
    public void findAllByName_foundALot() {
        int foundALot = 2;
        Client saved = repository.save(createClient());
        repository.save(createClient(saved.getName()));

        List<Client> found = service.findAllByName(saved.getName());

        assertEquals(foundALot, found.size());
    }
}
