package ru.gold.ordance.board.web.api.advertisement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.web.api.GetByNameRq;

@AllArgsConstructor
@Getter
@ToString
public class AdvertisementGetByCategoryNameRq implements GetByNameRq {
    private static final long serialVersionUID = 1L;

    private final String name;
}
