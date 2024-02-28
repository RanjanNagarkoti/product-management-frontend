import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import client from "./network/api.js";
import Navbar from "./components/Navbar.jsx";

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
      <Navbar />
      <h1 className="text-3xl font-bold uppercase text-center font-roboto">
        {user.name}
      </h1>
    </>
  );
}

export default App;
