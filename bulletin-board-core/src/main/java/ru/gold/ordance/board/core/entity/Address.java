package ru.gold.ordance.board.core.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = {"locality_id", "street_id", "houseNumber"}) })
public class Address implements AbstractEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "address_sequence-generator")
    @GenericGenerator(
            name = "address_sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "address_sequence"),
                    @Parameter(name = "initial_value", value = "1"),
                    @Parameter(name = "increment_size", value = "1")
            })
    private Long id;

    @ManyToOne
    private Locality locality;

    @ManyToOne
    private Street street;

    private String houseNumber;
}