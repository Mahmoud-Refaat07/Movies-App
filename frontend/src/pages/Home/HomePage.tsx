import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import useAuthStore from "../../store/useAuthStore";

const HomePage = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="h-screen text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  }

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
