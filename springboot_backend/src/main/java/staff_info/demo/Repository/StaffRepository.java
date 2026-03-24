package staff_info.demo.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import staff_info.demo.Model.Staff_info;

@Repository
public interface StaffRepository extends MongoRepository<Staff_info, String> {
    Staff_info findByEmpNo(String empNo);
}

