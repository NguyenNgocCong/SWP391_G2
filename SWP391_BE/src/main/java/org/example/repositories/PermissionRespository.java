package org.example.repositories;

import com.courses.server.entity.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRespository extends JpaRepository<Permissions, Long> {
	
	@Query(value="select * from Permissions where role_id = ?1", nativeQuery=true)
    List<Permissions>findByRoleId(long role_id);
}
