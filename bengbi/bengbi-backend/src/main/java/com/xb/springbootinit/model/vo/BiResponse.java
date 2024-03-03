package com.xb.springbootinit.model.vo;

import lombok.Data;

/**
 * @author 王鹏
 * Bi 返回结果
 * @version 1.0
 */
@Data
public class BiResponse {

    private String genChart;

    private String genResult;

    private Long chartId;
}
