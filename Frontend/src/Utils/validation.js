

export function validateCustomerData(customerData, setValidationErrors) {

    const name_regex = /^\S+$/;
    const address_regex = /[A-Za-z0-9'\.\-\s\,]/;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const phone_regex = /^\d{10}$/;


    const errors = {
        firstName: "",
        lastName: "",
        Address: "",
        Company_name: "",
        Position: "",
        email: "",
        phone : ""
    }

    !name_regex.test(customerData.firstName) ? errors.firstName = "Name should not be empty or contain whitespace" : null;
    !address_regex.test(customerData.Address) ? errors.Address = "Address is not valid!" : null;
    !email_regex.test(customerData.email) ? errors.email = "Email is not valid!" : null;
    // !password_regex.test(customerData.Password) ? errors.Password = "Password should contain atleast 8 characters , atleast 1 uppercase , atleast 1 lowercase and atleast 1 special characters" : null;
    !phone_regex.test(customerData.phone) ? errors.phone = "Phone number is not valid!" : null;

    setValidationErrors(errors);
}


export function loginValidation (formData,setErrors){
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors = { email: '', password: '' };
    !email_regex.test(formData.email) ? errors.email = "Email is not valid!" : null;

    setErrors(errors);
}







