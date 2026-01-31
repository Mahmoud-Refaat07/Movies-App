import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";

const HomePage = () => {
  const { user, checkAuth } = useAuthStore();

  console.log(user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
