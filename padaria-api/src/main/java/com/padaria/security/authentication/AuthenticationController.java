package com.padaria.security.authentication;

import com.padaria.mapper.user.UserTokenMapper;
import com.padaria.model.user.UserTokenModel;
import com.padaria.validator.User.UserCustomValidation;
import com.padaria.dto.login.LoginDTO;
import com.padaria.dto.user.UserTokenDTO;
import com.padaria.repository.user.UserRepository;
import com.padaria.security.utils.JWTUtil;
import com.padaria.service.Impl.DetailUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;

@Validated
@RestController
@RequestMapping("/api/login")
public class AuthenticationController {

    @Autowired
    private DetailUserServiceImpl serviceMyUserDetail;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTokenMapper userTokenMapper;

    @Autowired
    private JWTUtil serviceJWT;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserCustomValidation userCustomValidation;

    public AuthenticationController(UserCustomValidation userCustomValidation) {
        this.userCustomValidation = userCustomValidation;
    }

    @PostMapping()
    public ResponseEntity<UserTokenDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        if (!this.userCustomValidation.validateActiveUser(loginDTO.userName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserDetails userDetails = serviceMyUserDetail.loadUserByUsername(loginDTO.userName());

        if (!passwordEncoder.matches(loginDTO.password(), userDetails.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String token = serviceJWT.generateToken(userDetails);
        return ResponseEntity.ok(buildUserToken(loginDTO.userName(), token));
    }

    private UserTokenDTO buildUserToken(String userName, String token) {
        Date expirationDate = serviceJWT.getExpirationTokenDate();

        UserTokenModel userTokenModel = new UserTokenModel();
        userTokenModel.setUserName(userName);
        userTokenModel.setToken(token);
        userTokenModel.setExpirationDate(expirationDate);
        return userTokenMapper.toDTO(userTokenModel);
    }

}
