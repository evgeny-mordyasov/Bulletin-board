package ru.gold.ordance.board.web.api.lnk;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.web.api.GetRq;

@AllArgsConstructor
@Getter
@ToString
public class LnkLocalityStreetGetByStreetRq implements GetRq {
    private static final long serialVersionUID = 1L;

    private final Long streetId;
}
