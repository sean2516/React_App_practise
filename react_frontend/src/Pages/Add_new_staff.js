import '../CSS/Form.css'

import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Add_new_info(){
    
    const [name, setName] = useState("");
    const [empNo, setEmpNo] = useState("");
    const [depart, setDepart] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const update_name = (e) =>{
        setName(e.target.value);
    }

    const update_empNo = (e) =>{
        setEmpNo(e.target.value);
    }

    const update_depart = (e) =>{
        setDepart(e.target.value);
    }

    const update_position = (e) =>{
        setPosition(e.target.value);
    }

    const update_phone = (e) =>{
        setPhone(e.target.value);
    }

    const update_email = (e) =>{
        setEmail(e.target.value);
    };
 
    const save_info = (e) =>{
        e.preventDefault();
        
        const staff_info_data = {
            name,
            empNo,
            depart,
            position,
            phone,
            email
        }

        axios.post('http://localhost:8080/staff_info/saveNewInfo', staff_info_data).then(response =>{
            console.log(response.data);
            
            if (response.data.success) {
                alert(response.data.message);
                navigate('/', {state:{staff_info_data}});
            }else{
                setError(response.data.message);
                alert(error);
            }  
        });
    }



    return(
        <div>            
            <div className="page_header">
                <h1> 添加新员工信息 </h1>
            </div>

            <div className="info_form">
                
                <div className="exit_button">
                    <button onClick={() => {navigate("/")}}> 退出 </button>
                </div>

                <form onSubmit={save_info}>
                    <div className='form_input'>
                        <label> 姓名 </label>
                        <input type="text" onChange={update_name} required></input>
                        <br></br>
                    </div>


                    <div className='form_input'>
                        <label> 员工号 </label>
                        <input type="text" onChange={update_empNo} required></input>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <br></br>
                    </div>

                    <div className='form_input'>
                        <label> 部门 </label>

                        <select onChange={update_depart} required>
                            <option> 硬件研发部 </option>
                            <option> 软件研发部 </option>
                            <option> 生产制造部 </option>
                            <option> 供应链管理部 </option>
                            <option> 测试部 </option>
                            <option> 市场营销部 </option>
                            <option> 技术支持部 </option>
                            <option> 维修与保修部 </option>
                            <option> 培训与认证部 </option>
                            <option> 财务部 </option>
                            <option> 人力资源部 </option>
                            <option> 法务与合规部 </option>
                            <option> 战略规划部 </option>
                            <option> 并购与投资部  </option>
                            <option> 信息安全部 </option>
                            <option> 基础设施部 </option>
                            <option> 可持续发展部 </option>
                        </select>
                        <br></br>
                    </div>

                    <div className='form_input'>
                        <label> 岗位 </label>
                        <input type="text" onChange={update_position} required></input>
                        <br></br>
                    </div>

                    <div className='form_input'>
                        <label> 联系电话 </label>
                        <input type="text" onChange={update_phone} required></input>
                        <br></br>
                    </div>

                    <div className='form_input'>
                        <label> 邮箱 </label>
                        <input type="text" onChange={update_email} required></input>
                        <br></br>
                    </div>

                    <div className='save_info_button'>
                        <button type="submit"> 保存并添加 </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add_new_info;