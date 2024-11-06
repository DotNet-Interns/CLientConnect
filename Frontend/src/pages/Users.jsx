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
    const [filterList, setFilterList] = useState([]);
    const [dropdownValue, setDropDownValue] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const usersPerPage = 5;


    useEffect(() => {
        fetchFilteredData(dropdownValue, 0);
    }, []);


    const fetchFilteredData = async (filter, start) => {
        const Auth_Token = getCookie("Auth_Token");
        try {
            let response;

            if (filter === "All") {
                response = await axios.get(`${server}/api/Users/${start}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`,
                    },
                });
            } else {
                response = await axios.get(`${server}/api/Users/${filter}/${start}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`,
                    },
                });
            }
            // console.log(response);
            setUserList(response.data.list);
            setTotalCount(response.data.count);
            setFilterList(response.data.list);
        } catch (error) {
            console.error("Error fetching customer data", error);
        }
    };




    const handleFilterClick = (event) => {
        const id = event.target.id;
        setCurrentPage(1);

        let filter;
        if (id === "active") {
            filter = "Active";
            setDropDownValue("Active");
        } else if (id === "inactive") {
            filter = "Inactive";
            setDropDownValue("Inactive");
        } else if (id === "all") {
            filter = "All";
            setDropDownValue("All");
        }

        fetchFilteredData(filter, 0);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const start = (newPage - 1) * usersPerPage;
        const filter = dropdownValue === "Active" ? "Active" : dropdownValue === "Inactive" ? "Inactive" : "All";
        fetchFilteredData(filter, start);
    };

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

    const getPaginatedUsers = () => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return filterList;
    };

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
                            <button className="btn btn-primary " id='true' onClick={sortFunction}>A-Z</button>
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
                {getPaginatedUsers().map((item, index) => {
                    const Date = ConvertDate(item.createdAt);
                    return (
                        <UserEntry key={index} cid={item.cid} name={`${item.firstName} ${item.lastName}`} CreatedBy={"Admin"} CreatedAt={Date} />
                    );
                })}

                {filterList.length === 0 && <p>No record found!</p>}
            </div>

            <div className='d-flex justify-content-center'>
                <button className="btn border border-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                    Previous
                </button>
                <span className='my-auto mx-2'>
                    {currentPage} of {Math.ceil(totalCount / usersPerPage)}
                </span>
                <button className="btn border border-2" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(totalCount / usersPerPage)}>
                    Next
                </button>
            </div>
        </>
    );
}

export default Users;