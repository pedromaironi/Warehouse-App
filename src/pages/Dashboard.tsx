import Sidebar from "../components/sidebar";
import { DashboardRouter } from "../router/DashboardRouter";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-row h-full">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex w-max min-w-full">
        <DashboardRouter />
      </div>
    </div>
  );
};

export default Dashboard;
