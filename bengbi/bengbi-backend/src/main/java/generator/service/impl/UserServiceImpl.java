package generator.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xb.springbootinit.model.entity.User;
import generator.service.UserService;
import com.xb.springbootinit.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
* @author 嘿嘿
* @description 针对表【user(用户)】的数据库操作Service实现
* @createDate 2024-01-03 17:53:19
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

}




