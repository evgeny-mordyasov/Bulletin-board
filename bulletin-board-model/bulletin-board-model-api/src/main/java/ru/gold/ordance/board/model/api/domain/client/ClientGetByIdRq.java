package ru.gold.ordance.board.model.api.domain.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.model.api.domain.GetByIdRq;

@AllArgsConstructor
@Getter
@ToString
public class ClientGetByIdRq implements GetByIdRq {
    private static final long serialVersionUID = 1L;

    private final Long entityId;
}
