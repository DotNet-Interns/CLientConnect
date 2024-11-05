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
    const [customerList, setCustomerList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [dropdownValue, setDropDownValue] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const customersPerPage = 5;
    

    useEffect(() => {
        fetchFilteredData(dropdownValue, 0);
    }, []);

    const fetchFilteredData = async (filter, start) => {
        const Auth_Token = getCookie("Auth_Token");
        try {
            let response;
    
            if (filter === "All") {
                response = await axios.get(`${server}/api/Customers/get/${start}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`,
                    },
                });
            } else {
                response = await axios.get(`${server}/api/Customers/${filter}/${start}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`,
                    },
                });
            }
            // console.log(response);
            setCustomerList(response.data.list);
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
        const start = (newPage - 1) * customersPerPage;
        const filter = dropdownValue === "Active" ? "Active" : dropdownValue === "Inactive" ? "Inactive" : "All";
        fetchFilteredData(filter, start);
    };

    const sortFunction = () => {
        const sortByFullName = (array) => {
            return [...array].sort((a, b) => {
                const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                return fullNameA < fullNameB ? -1 : fullNameA > fullNameB ? 1 : 0;
            });
        };

        const sortedList = sortByFullName(filterList);
        setFilterList(sortedList);
    };

    const getPaginatedCustomers = () => {
        const startIndex = (currentPage - 1) * customersPerPage;
        return filterList;
    };

    return (
        <>
            <Navbar ifAdmin={contextUser?.role === 0} />
            <div className="mx-sm-5">
                <div className="options d-flex">
                    <h3 className="mt-3 ms-2 ms-md-0">Customer List</h3>
                    <ul className="nav ms-auto justify-content-md-end mt-3 row">
                        <li className="nav-item col-sm-4 col-6 ms-auto">
                            <Link to={"/addCustomer"}>
                                <button className="btn btn-primary mx-md-3" aria-current="page">
                                    Add
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item col-sm-4 col-6">
                            <button className="btn btn-primary" onClick={sortFunction}>
                                A-Z
                            </button>
                        </li>
                        <li className="nav-item col-sm-4 col ms-auto mt-2 mt-sm-0">
                            <div className="dropdown ms-auto">
                                <button className="btn btn-secondary dropdown-toggle ms-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {dropdownValue}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={handleFilterClick} id="active" className="dropdown-item">Active</li>
                                    <li onClick={handleFilterClick} id="inactive" className="dropdown-item">Inactive</li>
                                    <li onClick={handleFilterClick} id="all" className="dropdown-item">All</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                {getPaginatedCustomers().map((item, index) => {
                    const Date = ConvertDate(item.createdAt);
                    return (
                        <CustomerEntry key={index} cid={item.cid} name={`${item.firstName} ${item.lastName}`} CreatedBy={item.createdBy} CreatedAt={Date} />
                    );
                })}

                {filterList.length === 0 && <p>No record found!</p>}
            </div>

            <div className='d-flex justify-content-center'>
                <button className="btn border border-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                    Previous
                </button>
                <span className='my-auto mx-2'>
                    {currentPage} of {Math.ceil(totalCount / customersPerPage)}
                </span>
                <button className="btn border border-2" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(totalCount / customersPerPage)}>
                    Next
                </button>
            </div>
        </>
    );
}

export default Customers;
