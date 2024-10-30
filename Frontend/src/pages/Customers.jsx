import { useEffect, useState } from 'react';
import CustomerEntry from '../Components/CustomerEntry';
import Navbar from '../Components/Navbar';
import { useUserInfo } from '../Contexts/User';
import axios from 'axios';
import { getCookie } from '../Utils/cookie';
import ConvertDate from '../Utils/ConvertDate';
const server = import.meta.env.VITE_SERVER;

function Customers() {
    const { contextUser } = useUserInfo();
    const [customerList, setCustomerList] = useState(null);
    console.log(customerList);


    useEffect(() => {
        const getCustomerData = async () => {
            const Auth_Token = getCookie("Auth_Token")
            const response = await axios.get(`${server}/api/Customers`, {
                headers: {
                    Authorization: `Bearer ${Auth_Token}`
                }
            })

            console.log(response);
            setCustomerList(response.data)

        }
        getCustomerData();
    }, [])
    return (
        <>
            <Navbar ifAdmin={(contextUser?.role === 0) ? true : false} />
            <div className="mx-sm-5">
                <div className="options d-flex">
                <h3 className='mt-3'>Customer List</h3>
                    <ul className="nav ms-auto justify-content-md-end mt-3">
                        <li className="nav-item">
                            <button className="btn btn-primary mx-3" aria-current="page" href="#">Add</button>
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
                    customerList?.map((item, index) => {
                        const Date = ConvertDate(item.createdAt);
                        return <CustomerEntry key={index} cid={item.cid} name={`${item.firstName} ${item.lastName}`} CreatedBy={item.createdBy} CreatedAt={Date} />
                    })
                }
            </div>
        </>
    );
}

export default Customers;