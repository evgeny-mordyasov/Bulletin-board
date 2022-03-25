package ru.gold.ordance.board.persistence.repository;

import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface SearchByNameRepository<Entity> extends EntityRepository<Entity> {
    Optional<Entity> findByName(String name);
}
