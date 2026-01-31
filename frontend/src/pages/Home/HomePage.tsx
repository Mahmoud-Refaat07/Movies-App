import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import useAuthStore from "../../store/useAuthStore";

const HomePage = () => {
  const { user } = useAuthStore();

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
