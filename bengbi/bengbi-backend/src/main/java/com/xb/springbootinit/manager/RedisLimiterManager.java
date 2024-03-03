package com.xb.springbootinit.manager;

import com.xb.springbootinit.common.ErrorCode;
import com.xb.springbootinit.exception.BusinessException;
import org.redisson.api.RRateLimiter;
import org.redisson.api.RateIntervalUnit;
import org.redisson.api.RateType;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 王鹏
 * @version 1.0
 * 提供 RedisLimiter 限流的基础服务（通用）
 */
@Component
public class RedisLimiterManager {

    @Resource
    private RedissonClient redissonClient;

    /**
     * 区分不同的限流器
     * @param key
     */
    public void doRateLimit(String key){
        RRateLimiter rateLimiter = redissonClient.getRateLimiter(key);
        rateLimiter.trySetRate(RateType.OVERALL,2,1, RateIntervalUnit.SECONDS);

        boolean canOp = rateLimiter.tryAcquire(1);
        if (!canOp){
            throw new BusinessException(ErrorCode.TOO_MANY_REQUEST);
        }


    }
}
