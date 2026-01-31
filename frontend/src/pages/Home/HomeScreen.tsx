import useAuthStore from "../../store/useAuthStore";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      HomeScreen <button onClick={() => logout()}>xx</button>
    </div>
  );
};

export default HomeScreen;
