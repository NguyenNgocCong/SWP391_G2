package org.example.services;

import org.example.dto.request.*;
import org.example.dto.response.JwtResponse;
import org.example.entity.Expert;
import org.example.entity.User;
import org.example.entity.UserPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public interface UserService {
    Page<User> getListUser(Pageable paging, Params params) throws IOException;

    Page<User> getListManager(Pageable paging);

    Page<Expert> getListExpert(Pageable paging);

    Page<User> getListTrainer(Pageable paging);

    Page<User> getListSupporter(Pageable paging);

    String createAccount(RegisterRequest registerDTO);

    void verifyRegister(User user);

    JwtResponse loginAccount(String username, String password);

    void updateResetPasswordToken(String token, String email);

    User getByResetPasswordToken(String token);

    void updatePassword(User customer, String newPassword);

    User getByRegisterToken(String token);

    void updateRole(RoleRequest roleDTO);

    void updateUser(Long id, String username, UserUpdateRequest user);

    User getUserDetail(String username);

    void updateAvatar(String username, MultipartFile image) throws IOException;

    void updateActive(String username, UpdateActiveUserRequest activeUserDTO);

    Page<UserPackage> listMyCourses(Pageable pageable);

    UserPackage myCourseDetail(Long id);

    void activeCourse(String code);

}
