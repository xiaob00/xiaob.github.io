package com.xb.springbootinit.manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author 王鹏
 * @version 1.0
 */
@SpringBootTest
class AiManagerTest {

    @Resource
    private AiManager aiManager;

    @Test
    void doChart() {
//        String answer = aiManager.doChart("邓紫棋");
//        System.out.println(answer);
    }
}