package ru.gold.ordance.board.web.api.category;

import lombok.*;
import ru.gold.ordance.board.web.api.UpdateRq;

@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@ToString
public class CategoryUpdateRq implements UpdateRq {
    private static final long serialVersionUID = 1L;

    private final Long entityId;

    private final String name;
}
