package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity @Setter
@Getter
@AllArgsConstructor @NoArgsConstructor @ToString
public class ComboPackage extends BaseDomain{
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "combo_id", referencedColumnName = "id")
    private Combo combo;

    @ManyToOne
    @JoinColumn(name = "package_id", referencedColumnName = "id")
    private java.lang.Package _package;

    @Column(name = "sale_price")
    private double salePrice;
}
