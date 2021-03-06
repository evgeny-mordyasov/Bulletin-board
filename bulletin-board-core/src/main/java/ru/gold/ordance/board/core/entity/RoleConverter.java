package ru.gold.ordance.board.core.entity;

import org.springframework.util.StringUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import java.util.stream.Stream;

import static org.springframework.util.StringUtils.hasText;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<Role, String> {
    @Override
    public String convertToDatabaseColumn(Role role) {
        if (role == null) {
            return null;
        }

        return role.getName();
    }

    @Override
    public Role convertToEntityAttribute(String role) {
        if (!StringUtils.hasText(role)) {
            return null;
        }

        return Stream.of(Role.values())
                .filter(r -> role.equals(r.getName()))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
