package staff_info.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import staff_info.demo.Model.Staff_info;
import staff_info.demo.Repository.StaffRepository;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staff_repository;

    public List<Staff_info> getAllStaffInfo() {
        return staff_repository.findAll();
    }

    public Staff_info addNewStaff(Staff_info staff_info_data){
        staff_repository.save(staff_info_data);
        return staff_info_data;
    }

    public Staff_info updateStaffInfo(String id, Staff_info data){
        Staff_info staff_information = staff_repository.findByEmpNo(id);

        if (staff_information == null){
            return null;
        }

        staff_information.setName(data.getName());
        staff_information.setEmpNo(data.getEmpNo());
        staff_information.setDepart(data.getDepart());
        staff_information.setPosition(data.getPosition());
        staff_information.setPhone(data.getPhone());
        staff_information.setEmail(data.getEmail());

        return staff_repository.save(staff_information);
    }

    public Staff_info getInfoByEmpNo(String num){
        return staff_repository.findByEmpNo(num);
    }

    public String deleteInfo(String id) {
        Staff_info staff_information = staff_repository.findByEmpNo(id);

        if (staff_information == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        String name = staff_information.getName();
        String empNo = staff_information.getEmpNo();

        staff_repository.delete(staff_information);
        return "员工号: " + empNo + ", " + name + " 的信息已删除。";
    }

    public boolean checkEmployeeIDExist(String emp_num){
        Staff_info data = staff_repository.findByEmpNo(emp_num);
        if(data == null) {
            return false;
        }
        return true;
    }

}
