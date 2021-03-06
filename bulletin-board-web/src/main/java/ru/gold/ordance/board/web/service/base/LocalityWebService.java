package ru.gold.ordance.board.web.service.base;

import ru.gold.ordance.board.web.api.locality.*;

public interface LocalityWebService {
    LocalityGetRs findAll();
    LocalityGetRs findById(LocalityGetByIdRq rq);
    LocalityUpdateRs update(LocalityUpdateRq rq);
    LocalityDeleteByIdRs deleteById(LocalityDeleteByIdRq rq);
    LocalityGetRs findByName(LocalityGetByNameRq rq);
}
