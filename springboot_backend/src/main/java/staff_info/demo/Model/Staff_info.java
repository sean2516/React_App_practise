package staff_info.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Staff_info")
public class Staff_info {
    @Id
    @JsonIgnore
    private String id;
    private String name;
    private String empNo;
    private String position;
    private String phone;
    private String email;
    private String depart;

    public String getID(){
        return id;
    }

    public void setID(String id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEmpNo(){
        return empNo;
    }

    public void setEmpNo(String empNo){
        this.empNo = empNo;
    }

    public String getPosition(){
        return position;
    }

    public void setPosition(String position){
        this.position = position;
    }

    public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email= email;
    }

    public String getDepart(){
        return depart;
    }

    public void setDepart(String depart){
        this.depart = depart;
    }

}
