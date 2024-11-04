import { useEffect, useState } from 'react';
import CustomerEntry from '../Components/CustomerEntry';
import Navbar from '../Components/Navbar';
import { useUserInfo } from '../Contexts/User';
import axios from 'axios';
import { getCookie } from '../Utils/cookie';
import ConvertDate from '../Utils/ConvertDate';
import { Link } from 'react-router-dom';
const server = import.meta.env.VITE_SERVER;

function Customers() {
    const { contextUser } = useUserInfo();
    const [customerList, setCustomerList] = useState(null);
    const [filterList, setFilterList] = useState(customerList);
    const [dropdownValue , setDropDownValue] = useState("Active")
    // console.log(filterList);
    


    useEffect(() => {
        const getCustomerData = async () => {
            const Auth_Token = getCookie("Auth_Token")
            const response = await axios.get(`${server}/api/Customers`, {
                headers: {
                    Authorization: `Bearer ${Auth_Token}`
                }
            })

            // console.log(response);
            setCustomerList(response.data)
            setFilterList(() => {
                return response.data?.filter((item, index) => {
                    return item.status === 0
                })
            })
        }
        getCustomerData();
    }, [])


    const handleFilterClick = (event) => {
        const id = event.target.id;
        // console.log(`Clicked ${id}`);


        if (id === "active") {
            setDropDownValue("Active");
            setFilterList(() => {
                return customerList.filter((item, index) => {
                    return item.status === 0
                })
            })
        } else if (id === "inactive") {
            setDropDownValue("Inactive");
            setFilterList(() => {
                return customerList.filter((item, index) => {
                    return item.status === 1
                })
            })
        } else if (id === "all") {
            setDropDownValue("All");
            setFilterList(() => {
                return customerList.filter((item, index) => {
                    return item.status === 1 || item.status === 0
                })
            })
        }
    }

    const sortFunction = (event) => {
        const sortByFullName = (array) => {
            return  [...array].sort((a, b) => {
                const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();

                if (fullNameA < fullNameB) return -1;
                if (fullNameA > fullNameB) return 1;
                return 0;
            });
            //setFilterList(sortedArray);
            
        };
        
        setFilterList(sortByFullName(filterList));
        // console.log(filterList);
    }



    return (
        <>
            <Navbar ifAdmin={(contextUser?.role === 0) ? true : false} />
            <div className="mx-sm-5">
                <div className="options d-flex">
                    <h3 className='mt-3'>Customer List</h3>
                    <ul className="nav ms-auto justify-content-md-end mt-3">
                        <li className="nav-item">
                            <Link to={"/addCustomer"}><button className="btn btn-primary mx-3" aria-current="page" >Add</button></Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary mx-3" id='true'  onClick={sortFunction}>A-Z</button>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                        const Date = ConvertDate(item.createdAt);
                        return <CustomerEntry key={index} cid={item.cid} name={`${item.firstName} ${item.lastName}`} CreatedBy={item.createdBy} CreatedAt={Date} />
                    })
                }

                {
                    (filterList?.length === 0) && <p>No record found!</p>
                }
            </div>
        </>
    );
}

export default Customers;