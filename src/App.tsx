import AppProvider from "./Context";
import Routes from "./routes";
import { initializeFakeUser } from "./services/authentication";

initializeFakeUser();

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
