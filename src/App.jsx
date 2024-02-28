import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import client from "./network/api.js";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const { token, user, setUser } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const response = await client.get("/user", {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data;
        setErrorUI(errors);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
}

export default App;
