package org.example.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String storeFile(MultipartFile file);

    public Resource loadFileAsResource(String fileName);

}