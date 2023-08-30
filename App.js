import { PaperProvider } from "react-native-paper";
import AuthContextProvider from "./src/context/AuthContext";
import AppNavigator from "./src/navigation";

const App = () => {
  return (
    <AuthContextProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthContextProvider>
  );
};

export default App;
