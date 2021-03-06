package ru.gold.ordance.board.web.service.mapper.impl;

import ru.gold.ordance.board.web.api.lnk.LnkLocalityStreetUpdateRq;
import ru.gold.ordance.board.web.api.lnk.WebLnkLocalityStreet;
import ru.gold.ordance.board.core.entity.LnkLocalityStreet;
import ru.gold.ordance.board.core.entity.Locality;
import ru.gold.ordance.board.core.entity.Street;
import ru.gold.ordance.board.web.service.mapper.LnkLocalityStreetMapper;

public class LnkLocalityStreetMapperImpl implements LnkLocalityStreetMapper {
    @Override
    public LnkLocalityStreet fromRequest(LnkLocalityStreetUpdateRq rq) {
        return LnkLocalityStreet.builder()
                .id(rq.getEntityId())
                .locality(Locality.builder()
                        .id(rq.getLocalityId())
                        .build())
                .street(Street.builder()
                        .id(rq.getStreetId())
                        .build())
                .build();
    }

    @Override
    public WebLnkLocalityStreet fromEntity(LnkLocalityStreet entity) {
        return WebLnkLocalityStreet.builder()
                .entityId(entity.getId())
                .localityId(entity.getLocality().getId())
                .streetId(entity.getStreet().getId())
                .build();
    }
}
