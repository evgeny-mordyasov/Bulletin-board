package ru.gold.ordance.board.model.api.domain.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.model.api.domain.DeleteByIdRq;

@AllArgsConstructor
@Getter
@ToString
public class CategoryDeleteByIdRq implements DeleteByIdRq {
    private final Long entityId;
}