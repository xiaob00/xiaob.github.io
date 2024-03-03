package com.xb.springbootinit.utils;

import cn.hutool.core.collection.CollUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.support.ExcelTypeEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author 王鹏
 * @version 1.0
 */
@Slf4j
public class ExcelUtils {

    public static String excelToCvs(MultipartFile multipartFile){
//        File file = null;
//        try {
//            file = ResourceUtils.getFile("classpath:网站数据.xlsx");
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        }
        List<Map<Integer, String>> list = null;
        try {
            list = EasyExcel.read(multipartFile.getInputStream())
                    .excelType(ExcelTypeEnum.XLSX)
                    .sheet()
                    .headRowNumber(0)
                    .doReadSync();
        } catch (IOException e) {
            log.error("csv转换错误");
        throw new RuntimeException(e);
    }
        if (CollUtil.isEmpty(list)){
        return "";
    }
    //转换为csv
    StringBuffer stringBuffer = new StringBuffer();
    LinkedHashMap<Integer, String> headerMap = (LinkedHashMap)list.get(0);
    List<String> headerList =
            headerMap.values().stream().filter(ObjectUtils::isNotEmpty).collect(Collectors.toList());
        stringBuffer.append(StringUtils.join(headerList,",")).append("\n");

        for (int i = 1; i < list.size(); i++) {
        LinkedHashMap<Integer, String> dataMap = (LinkedHashMap)list.get(i);
        List<String> dataList =
                dataMap.values().stream().filter(ObjectUtils::isNotEmpty).collect(Collectors.toList());
        stringBuffer.append(StringUtils.join(dataList,",")).append("\n");
    }
        System.out.println(list);
        return stringBuffer.toString();
    }

    public static void main(String[] args) {
        excelToCvs(null);
    }
}
