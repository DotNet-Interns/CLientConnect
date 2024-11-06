const name_regex = /^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/;
const address_regex = /[A-Za-z0-9'\.\-\s\,]/;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const phone_regex = /^\d{10}$/;
const company_regex = /^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/;
const position_regex = /^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$/;


export default function validateCustomerData(customerData, setValidationErrors) {



    const errors = {
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone: ""
    }

    let bool_check = true;

    if (!name_regex.test(customerData.firstName)) {
        errors.firstName = "Name should not be empty or contain whitespace";
        bool_check = false
    };

    if (!address_regex.test(customerData.Address)) {
        errors.Address = "Address is not valid!";
        bool_check = false
    }

    if (!email_regex.test(customerData.email)) {
        errors.email = "Email is not valid!";
        bool_check = false
    }
    
    if (!phone_regex.test(customerData.phone)) {
        errors.phone = "Phone number is not valid!";
        bool_check = false
    }

    if(!company_regex.test(customerData.Position)){
        errors.Position = "Position is not valid!"
        bool_check = false
    }

    if(!company_regex.test(customerData.Company_name)){
        errors.Company_name = "Company name is not valid!"
        bool_check = false
    }

    setValidationErrors(errors);
    return bool_check;
}


const loginValidation = (formData, setErrors) => {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let bool_check = true;
    const errors = { email: '', password: '' };

    if (!email_regex.test(formData.email)) {
        errors.email = "Email is not valid!";
        bool_check = false;
    };

    setErrors(errors);
    return bool_check;
}


const SRFormValidation = (formData, setErrors) => {

}


export { loginValidation }






