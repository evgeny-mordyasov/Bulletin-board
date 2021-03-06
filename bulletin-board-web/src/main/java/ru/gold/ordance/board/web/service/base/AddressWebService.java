package ru.gold.ordance.board.web.service.base;

import ru.gold.ordance.board.web.api.address.*;

public interface AddressWebService {
    AddressGetRs findAll();
    AddressGetRs findById(AddressGetByIdRq rq);
    AddressUpdateRs update(AddressUpdateRq rq);
    AddressDeleteByIdRs deleteById(AddressDeleteByIdRq rq);
}
