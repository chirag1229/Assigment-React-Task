import { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import BidTable from './components/BidTable';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for react-router-dom
import { IoIosLogOut } from "react-icons/io";

// Define type for user from localStorage
interface User {
  username: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null"); // Type casting the user data as User type
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-8">
                <a href="#" className="font-semibold text-blue-600">Bid</a>
                <a href="#" className="text-gray-600">POD</a>
                <a href="#" className="text-gray-600">Vendor</a>
                <a href="#" className="text-gray-600">User</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user?.username}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login"); // Redirect to login page
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-lg"
              >
                <IoIosLogOut />
                LOG OUT
              </button>
            </div>

          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-6">
            {/* Tabs and Actions */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4">
                <div className="flex gap-4 mb-4 lg:mb-0">
                  <button className="text-blue-600">Live (30)</button>
                  <button className="text-green-600">Responded (30)</button>
                  <button className="text-red-600">Unresponded (30)</button>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search"
                      className="w-full lg:w-64 pl-4 pr-10 py-2 border rounded-lg"
                    />
                  </div>
                  <Link to={'/admin'}>
                    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                      <Plus size={20} />
                      Create
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bid Table */}
            <BidTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
