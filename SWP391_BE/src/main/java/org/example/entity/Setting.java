package org.example.entity;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder

@Table(name = "Setting")
public class Setting {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long setting_id;

	@ManyToOne()
	@JoinColumn(name = "type_id", referencedColumnName = "type_id")
	private Type type;
	@NotNull
	private String setting_title;

	private String setting_value;

	private String display_order;

	private Boolean status;

	private String desciption;
}
