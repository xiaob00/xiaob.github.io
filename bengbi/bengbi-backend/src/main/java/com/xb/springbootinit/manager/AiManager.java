package com.xb.springbootinit.manager;

import com.xb.springbootinit.common.ErrorCode;
import com.xb.springbootinit.exception.BusinessException;
import com.yupi.yucongming.dev.client.YuCongMingClient;
import com.yupi.yucongming.dev.common.BaseResponse;
import com.yupi.yucongming.dev.model.DevChatRequest;
import com.yupi.yucongming.dev.model.DevChatResponse;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;

/**
 * @author 王鹏
 * @version 1.0
 */
@Service
public class AiManager {

    @Resource
    private YuCongMingClient yuCongMingClient;



    /**
     * AI 对话
     * @param message
     * @return
     */
    public String doChart(long biModelId,String message){
        DevChatRequest devChatRequest = new DevChatRequest();
        devChatRequest.setModelId(biModelId);
        devChatRequest.setMessage(message);
        BaseResponse<DevChatResponse> response = yuCongMingClient.doChat(devChatRequest);
        if (response == null){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"AI 响应错误");
        }
        return response.getData().getContent();
    }
}
