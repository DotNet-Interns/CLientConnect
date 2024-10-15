import React, { useState } from 'react';
import '../styles/Login.css'; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Reset error message on input change
    };

    // Validating form and handling submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email is required.';

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long, include an uppercase, lowercase, digit, and special character.";
        }

        if (Object.keys(newErrors).length === 0) {
            // Proceed with form submission (e.g., call an API)
            console.log('Form submitted:', formData);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="login d-flex  justify-content-center align-items-center vh-100">

            <div className="login-container p-3 border rounded-3">
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback flex-wrap">{errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
