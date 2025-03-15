import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "guest",  
    email: "",
    password: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate("/"); // Redirect to home on success
      } else {
        navigate("/login")
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img  style={{width:"100px"}}  src="/logo.png" alt="Hotel Logo" />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Create an account
          </h3>

          <form onSubmit={handleRegister}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?
          </span>
          <a href="/login" className="mx-2 text-sm font-bold text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
