package org.example.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScreenDTO {
	
	private Boolean get_all_data;
	
	private Boolean can_delete;
	
	private Boolean can_add;
	
	private Boolean can_edit;
}
