import AuthContextProvider from "./src/context/AuthContext";
import AppNavigator from "./src/navigation";

const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
};

export default App;
