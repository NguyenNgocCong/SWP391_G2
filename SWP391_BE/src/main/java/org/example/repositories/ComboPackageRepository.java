package org.example.repositories;

import com.courses.server.entity.ComboPackage;
import com.courses.server.entity.ComboPackageKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComboPackageRepository extends JpaRepository<ComboPackage, ComboPackageKey> {
}
