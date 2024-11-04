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
    const { contextUser } = useUserInfo();
    const [userList, setUserList] = useState(null);
    const [filterList, setFilterList] = useState(userList);
    const [dropdownValue , setDropDownValue] = useState("Active")

    useEffect(() => {
        const getUsers = async () => {
            const Auth_Token = getCookie("Auth_Token")
            const response = await axios.get(`${server}/api/Users`, {
                headers: {
                    Authorization: `Bearer ${Auth_Token}`
                }
            })
            console.log(response);
            setUserList(response.data)
            setFilterList(() => {
                return response.data?.filter((item, index) => {
                    return item.status === 0
                })
            })
        }
        getUsers();
    }, [])





    const handleFilterClick = (event) => {
        const id = event.target.id;
        if (id === "active") {
            setDropDownValue("Active");
            setFilterList(() => {
                return userList.filter((item, index) => {
                    return item.status === 0
                })
            })
        } else if (id === "inactive") {
            setDropDownValue("Inactive");
            setFilterList(() => {
                return userList.filter((item, index) => {
                    return item.status === 1
                })
            })
        } else if (id === "all") {
            setDropDownValue("All");
            setFilterList(() => {
                return userList.filter((item, index) => {
                    return item.status === 1 || item.status === 0
                })
            })
        }
    }

    const sortFunction = (event) => {
        const sortByFullName = (array) => {
            return [...array].sort((a, b) => {
                const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();

                if (fullNameA < fullNameB) return -1;
                if (fullNameA > fullNameB) return 1;
                return 0;
            });
            //setFilterList(sortedArray);

        };

        setFilterList(sortByFullName(filterList));
    }


    return (
        <>
            <Navbar ifAdmin={(contextUser?.role === 0) ? true : false} />
            <div className="mx-sm-5">
                <div className="options d-flex">
                    <h3 className='mt-3 ms-2 ms-md-0'>Sales Representative List</h3>
                    <ul className="nav ms-auto justify-content-md-end mt-3 row">
                        <li className="nav-item col-sm-4 col-6 ms-auto">
                            <Link to={"/addSR"}><button className="btn btn-primary mx-md-3" aria-current="page" >Add</button></Link>
                        </li>
                        <li className="nav-item col-sm-4 col-6">
                            <button className="btn btn-primary " id='true'  onClick={sortFunction}>A-Z</button>
                        </li>
                        <li className="nav-item col-sm-4 col ms-auto mt-2 mt-sm-0">
                            <div className="dropdown ms-auto">
                                <button className="btn btn-secondary dropdown-toggle ms-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {dropdownValue}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={handleFilterClick} id='active' className="dropdown-item">Active</li>
                                    <li onClick={handleFilterClick} id='inactive' className="dropdown-item">Inactive</li>
                                    <li onClick={handleFilterClick} id='all'
                                        className="dropdown-item">All</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                {
                    filterList?.map((item, index) => {

                        const date = ConvertDate(item.createdAt)
                        return (item.role === 1) ? <UserEntry key={index} name={`${item.firstName} ${item.lastName}`} CreatedBy={"Admin"} CreatedAt={date} uid={item.userID} /> : null
                    })
                }

                {
                    (filterList?.length === 0) && <p>No record found!</p>
                }
            </div>
        </>
    );
}

export default Users;