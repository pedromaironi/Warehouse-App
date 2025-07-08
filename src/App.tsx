import { AppRouter } from "./router/AppRouter";
import { store } from "./store";
import { Provider } from "react-redux";
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};

export default App;
