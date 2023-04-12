package org.example.entity;

import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder

public class PermissionId implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@ManyToOne()
    @JoinColumn(name = "role_id", referencedColumnName = "setting_id")
    private Setting role_id;
	@ManyToOne()
    @JoinColumn(name = "screen_id", referencedColumnName = "setting_id")
    private Setting screen_id;
}
