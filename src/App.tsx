import { AppRouter } from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AppRouter />
    </div>
  );
};

export default App;
