package ru.gold.ordance.board.model.api.domain.client;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.model.api.domain.Rs;
import ru.gold.ordance.board.model.api.domain.Status;
import ru.gold.ordance.board.model.api.domain.StatusCode;

import java.util.List;

@Builder
@Getter
@ToString
public class ClientGetRs implements Rs {
    private final Status status;

    private final List<WebClient> clientList;

    private final Integer total;

    public static ClientGetRs success(List<WebClient> clientList) {
        return ClientGetRs.builder()
                .status(new Status().withCode(StatusCode.SUCCESS))
                .clientList(clientList)
                .total(clientList.size())
                .build();
    }

    public static ClientGetRs error(StatusCode code, String description) {
        if (code == StatusCode.SUCCESS) {
            throw new IllegalArgumentException("The transmitted code not should equal SUCCESS.");
        }

        return ClientGetRs.builder()
                .status(new Status().withCode(code).withDescription(description))
                .build();
    }
}