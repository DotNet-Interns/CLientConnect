import CustomerEntry from '../Components/CustomerEntry';
import Navbar from '../Components/Navbar';

function Customers() {
    return (
        <>
            <Navbar />
            <div className="mx-sm-5">
                <div className="options">
                    <ul className="nav justify-content-md-end mt-3">
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

                <h3>Customer List</h3>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
                <CustomerEntry/>
            </div>
        </>
    );
}

export default Customers;