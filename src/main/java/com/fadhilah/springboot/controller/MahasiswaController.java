package com.fadhilah.springboot.controller;

import com.fadhilah.springboot.model.dto.MahasiswaDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/biodata")
public class MahasiswaController {

    @GetMapping("/get")
    public MahasiswaDto getMahasiswa(){
        MahasiswaDto m = new MahasiswaDto();
        m.setNamaMahasiswa("Fadhilah");
        m.setAlamat("Surabaya");

        return m;
    }
//    public DefaultResponse<MahasiswaDto> getBiodataByEmail(WebRequest request){
//        return DefaultResponse.ok(service.getBiodataByEmail(request));
//    }
}
