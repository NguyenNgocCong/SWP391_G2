package org.example.services;

import com.courses.server.dto.request.ClassRequest;
import com.courses.server.dto.request.Params;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface ClassService {
    void addClass(ClassRequest classRequest);

    void updateCLass(Long id, ClassRequest classRequest);

    Page<Class> getAllClass(Pageable paging, Params params, boolean isGuest) throws IOException;

    Class getClassDetail(Long id);

}
