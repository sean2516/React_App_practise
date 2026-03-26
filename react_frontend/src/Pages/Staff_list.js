import '../CSS/Staff_list.css'

import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Staff_list(){
    const [infoList, setInfoList] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [keyWord, setKeyword] = useState("");

    const navigate = useNavigate();
    
    useEffect( () => {
        axios.get('http://localhost:8080/staff_info')
        .then( response => {
            console.log('获取员工信息:', response.data );
            setInfoList(response.data);
        } );
    }, [] );


    const get_user_input = (e) =>{
        setUserInput(e.target.value);
    };

    const search_keyword = (e) =>{
        e.preventDefault();
        setKeyword(userInput);    
    }

    return (
        <div className="App">
            <header className="page_header">
                <h1>
                    人员信息
                </h1>
            </header>

            
            
            <div className="search_bar">
                <div className='search_input'> 
                     <input type="text" value={userInput} onChange={get_user_input} /> 
                </div>

                <div className='search_button'>
                    <button onClick={search_keyword}> 搜索 </button>
                </div>
                
            </div>
            
            <div className='Info_list'>

                <div className="Add_button">
                    <button onClick={() => {navigate("/new_info")}}> 添加新人员信息 </button>
                </div>

                <table className='Info_table'>
                    <tr>
                        <th>姓名</th>
                        <th>员工号</th>
                        <th>部门</th>
                        <th>岗位</th>
                        <th>联系电话</th>
                        <th>邮箱</th> 
                        <th></th>  
                    </tr>

                    {infoList.map((data) => {
                        if (data.name.toLowerCase().includes(keyWord.toLowerCase()) || 
                            data.empNo.toLowerCase().includes(keyWord.toLowerCase()) ||
                            data.depart.toLowerCase().includes(keyWord.toLowerCase()) ||
                            data.position.toLowerCase().includes(keyWord.toLowerCase()) ||
                            data.phone.toLowerCase().includes(keyWord.toLowerCase()) ||
                            data.email.toLowerCase().includes(keyWord.toLowerCase())
                        ){
                            return(
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.empNo}</td>
                                    <td>{data.depart}</td>
                                    <td>{data.position}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.email}</td>
                                    <td className='edit_block'> <button className="edit_button" onClick={() => {navigate("/edit_info/" + data.empNo)}}> 编辑 </button> </td>
                                </tr>
                            ) 
                            
                        }else{
                            
                            <tr>
                                <td style={{textAlign: 'center'}}>
                                    没有匹配项，请重新输入关键词搜索
                                </td>
                            </tr>
                            
                        }
                        
                        
                    })}
                </table>
            </div>
    </div>
    );
}

export default Staff_list;

