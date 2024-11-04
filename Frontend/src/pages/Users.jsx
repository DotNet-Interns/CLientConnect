import UserEntry from '../Components/UserEntry';
import Navbar from '../Components/Navbar';
import { useUserInfo } from '../Contexts/User';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../Utils/cookie';
import ConvertDate from '../Utils/ConvertDate';
import { Link } from 'react-router-dom';
const server = import.meta.env.VITE_SERVER;

function Users() {
    const {contextUser} = useUserInfo();
    const [userList , setUserList] = useState(null);

    useEffect(()=>{
        const getUsers = async ()=>{
            const Auth_Token = getCookie("Auth_Token")
            const response = await axios.get(`${server}/api/Users`,{
                headers : {
                    Authorization : `Bearer ${Auth_Token}`
                }
            })
            console.log(response);
            setUserList(response.data)
        }
        getUsers();
    },[])
    return (
        <>
            <Navbar ifAdmin={(contextUser?.role===0)?true:false} />
            <div className="mx-sm-5">
                <div className="options d-flex">
                <h3 className='mt-3'>Sales Representative List</h3>
                    <ul className="nav justify-content-md-end ms-auto mt-3">
                        <li className="nav-item">
                            <Link to={"/addSR"}><button className="btn btn-primary mx-3" aria-current="page" >Add</button></Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary mx-3" href="#">A-Z</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary mx-3" href="#">Active</button>
                        </li>

                    </ul>
                </div>

                {
                    userList?.map ((item,index)=>{
                    
                        const date = ConvertDate(item.createdAt)
                        return (item.role===1)?<UserEntry key={index} name={`${item.firstName} ${item.lastName}`} CreatedBy={"Admin"} CreatedAt={date} uid={item.userID} />:null 
                    })
                }
            </div>
        </>
    );
}

export default Users;