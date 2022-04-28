package ru.gold.ordance.board.model.api.domain.subcategory;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ru.gold.ordance.board.model.api.domain.Rs;
import ru.gold.ordance.board.model.api.domain.Status;
import ru.gold.ordance.board.model.api.domain.StatusCode;

@Builder
@Getter
@ToString
public class SubcategoryDeleteByIdRs implements Rs {
    private final Status status;

    public static SubcategoryDeleteByIdRs success() {
        return SubcategoryDeleteByIdRs.builder()
                .status(new Status().withCode(StatusCode.SUCCESS))
                .build();
    }

    public static SubcategoryDeleteByIdRs error(StatusCode code, String description) {
        if (code == StatusCode.SUCCESS) {
            throw new IllegalArgumentException("The transmitted code not should equal SUCCESS.");
        }

        return SubcategoryDeleteByIdRs.builder()
                .status(new Status().withCode(code).withDescription(description))
                .build();
    }
}