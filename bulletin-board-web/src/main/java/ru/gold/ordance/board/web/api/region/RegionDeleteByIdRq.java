package ru.gold.ordance.board.web.api.region;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.web.api.DeleteByIdRq;

@AllArgsConstructor
@Getter
@ToString
public class RegionDeleteByIdRq implements DeleteByIdRq {
    private static final long serialVersionUID = 1L;

    private final Long entityId;
}
