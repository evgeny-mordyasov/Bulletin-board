package ru.gold.ordance.board.web.api.advertisement;

import lombok.*;
import ru.gold.ordance.board.core.entity.*;
import ru.gold.ordance.board.web.api.client.WebClient;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@ToString
public class WebAdvertisement {
    private static final long serialVersionUID = 1L;

    private final Long entityId;

    private final WebClient client;

    private final String name;

    private final LocalDate createDate;

    private final Subcategory subcategory;

    private final String description;

    private final int price;

    private final Locality locality;

    private final Street street;

    private final String houseNumber;

    private final Photo photo;
}
