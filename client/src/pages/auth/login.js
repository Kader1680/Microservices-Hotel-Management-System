import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  
  
  const {user} =  useAuth();
  const receiver_id = user?.id;
  const [password, setPassword] = useState('');
  const [alertMessage, setalertMessage] = useState("")
  const { login } = useAuth();
 
 
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (true) {
          await login(email, password)
          navigate(`/`);  
        }
        setalertMessage("Email or Password Invalid")
    } catch (error) {
       
        
        console.error('Login failed:', error);
    }
};

  return (
    <div>
      <div
        style={{ backgroundColor: "#0F172B" }}
        className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md"
      >
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img  style={{width:"100px"}} src="/logo.png" alt="Hotel Logo" />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Login To Mario
          </h3>

          {alertMessage && (
            <div className="mt-4 p-2 bg-red-600 text-white text-center rounded">
              {alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="w-full bg-[#FEA116] px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?
          </span>
          <a
            href="/register"
            className="mx-2 text-sm font-bold text-[#FEA116] hover:underline"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;



