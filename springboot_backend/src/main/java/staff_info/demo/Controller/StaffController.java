package staff_info.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import staff_info.demo.Model.Staff_info;
import staff_info.demo.Service.StaffService;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StaffController {

    @Autowired
    private StaffService staff_service;

    @GetMapping("/staff_info")
    public List<Staff_info> get_staff_information() {
        return staff_service.getAllStaffInfo();
    }

    // 添加/保存新的员工信息
    @PostMapping("staff_info/saveNewInfo")
    public ResponseEntity<Map<String, Object>> saveNewInfo(@RequestBody Staff_info data){
        //如果该员工号已存在，请重新确认并输入
        String emp_num = data.getEmpNo();
        boolean empNo_exist = staff_service.checkEmployeeIDExist(emp_num);

        Map<String, Object> response = new HashMap<>();
        if (empNo_exist) {
            response.put("success", false);
            response.put("message", "员工号: " + emp_num + " 已存在, 请重新输入");
        }else{
            staff_service.addNewStaff(data);
            response.put("success", true);
            response.put("message", "员工 " + emp_num + " 信息添加成功");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //更新对应的员工号的员工信息
    @PutMapping("staff_info/editInfo/{id}")
    public ResponseEntity<Map<String, Object>> editInfo(@PathVariable String id, @RequestBody Staff_info new_data){
        Map<String, Object> response = new LinkedHashMap<>();
        Staff_info information = staff_service.getInfoByEmpNo(id);

        if (information != null){
            String new_name = new_data.getName();
            String new_empNo = new_data.getEmpNo();
            String new_depart = new_data.getDepart();
            String new_position = new_data.getPosition();
            String new_phone = new_data.getPhone();
            String new_email = new_data.getEmail();

            if(!Objects.equals(new_name, "") || !Objects.equals(new_empNo, "") || !Objects.equals(new_depart, "") || !Objects.equals(new_phone, "") || !Objects.equals(new_email, "") || !Objects.equals(new_position, "")){
                staff_service.updateStaffInfo(id, new_data);

                response.put("message", "员工号: " + new_empNo + ", " + new_name + "。信息编辑成功");
                response.put("success", true);
            }else{
                response.put("status", "400");
                response.put("error", "Bad Request");
                response.put("success", false);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }else{
            response.put("status", "404");
            response.put("error", "Not found");
            response.put("success", false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 根据员工号找信息
    @GetMapping("staff_info/{id}")
    public ResponseEntity<Staff_info> getInfoByEmpNo(@PathVariable String id) {
        Staff_info data = staff_service.getInfoByEmpNo(id);

        if (data == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // 删除对应的员工号的员工信息
    @DeleteMapping("staff_info/delete/{id}")
    public String deleteStaffInfo(@PathVariable String id){
        return staff_service.deleteInfo(id);
    }

}
