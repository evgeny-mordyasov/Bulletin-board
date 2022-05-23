package ru.gold.ordance.board.web.api.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.web.api.GetByNameRq;

@AllArgsConstructor
@Getter
@ToString
public class ClientGetByNameRq implements GetByNameRq {
    private static final long serialVersionUID = 1L;

    private final String name;
}
