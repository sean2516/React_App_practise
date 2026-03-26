import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Search_testing(){
    const [list, setList] = useState([]);
    const [keyWord, setKeyword] = useState("");
    const [userInput, setUserInput] = useState("");

    const navigate = useNavigate();
    
    useEffect( () => {
        axios.get('http://localhost:8080/staff_info')
        .then( response => {
            console.log('获取数据:', response.data );
            setList(response.data);
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
        <header className="App-header">
            <p>
                人员信息
            </p>
        </header>

        <div className="Search_bar">
            <input type="text" value={userInput} onChange={get_user_input} /> 
            <button onClick={search_keyword}> 搜索 </button>
        </div>

        <div>
            <p> 关键词: {keyWord}</p>
        </div>
        
        <div>
            <table>
                <tr>
                    <th>姓名</th>
                    <th>联系电话</th>
                    <th>邮箱</th>   
                </tr>

          
                {list.map((data) => {
                    if (data.name.toLowerCase().includes(keyWord.toLowerCase()) || 
                        data.phone.toLowerCase().includes(keyWord.toLowerCase()) ||
                        data.email.toLowerCase().includes(keyWord.toLowerCase())
                        ){
                        return(
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.email}</td>
                        </tr>
                        );
                    }else{
                        return(
                            <tr>
                                <td> 没有匹配项, 请重新输入关键词搜索 </td>
                            </tr>
                        );
                    }    
                })}
            </table>
        </div>
    </div>
    );
}

export default Search_testing;