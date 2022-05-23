package ru.gold.ordance.board.web.api.region;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.web.api.GetByIdRq;

@AllArgsConstructor
@Getter
@ToString
public class RegionGetByIdRq implements GetByIdRq {
    private static final long serialVersionUID = 1L;

    private final Long entityId;
}