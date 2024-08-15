import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  AccountCircle, ManageAccounts, Work, LocalActivity, 
  Lock, ExitToApp, CreateNewFolder, Handyman, Menu 
} from '@mui/icons-material';

import Profile from '../profilePage/profile';
import CreateJob from '../profilePage/Create_job';
import MyJob from '../profilePage/My_job';
import Dashboard from '../profilePage/dashboard';
import SecuritySettings from '../profilePage/settings';
import RecentActivity from '../profilePage/activity';
import ManageListings from '../profilePage/My_job';
import EditProfile from '../profilePage/editProfile';
import logOut from '../profilePage/logOut';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const DashboardLayout: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const handlePageChange = (pageName: string) => {
    setActivePage(pageName);
    setIsMenuOpen(false);
  };

  const seekerMenu: MenuItem[] = [
    { name: 'Profile', icon: AccountCircle, component: Profile },
    { name: 'Edit Profile', icon: ManageAccounts, component: EditProfile },
    { name: 'My Applications', icon: Work, component: MyJob },
    { name: 'Recent Activity', icon: LocalActivity, component: RecentActivity },
    { name: 'Security Settings', icon: Lock, component: SecuritySettings },
    { name: 'Sign Out', icon: ExitToApp,component:logOut }
  ];

  const employerMenu: MenuItem[] = [
    { name: 'Dashboard', icon: AccountCircle, component: Dashboard },
    { name: 'Post New Job', icon: CreateNewFolder, component: CreateJob },
    { name: 'Manage Listings', icon: Handyman, component: ManageListings },
    { name: 'Recent Activity', icon: LocalActivity, component: RecentActivity },
    { name: 'Security Settings', icon: Lock, component: SecuritySettings },
    { name: 'Sign Out', icon: ExitToApp,component:logOut }
  ];

  const menuItems: MenuItem[] = user?.user_role === 'seeker' ? seekerMenu : employerMenu;

  const ActiveComponent = menuItems.find(item => item.name === activePage)?.component || Profile;

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4 md:p-[100px]">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Mobile menu button */}
          <button
            className="lg:hidden bg-blue-600 rounded-lg text-white p-4 flex items-center justify-center mb-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="mr-2" />
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>

          {/* Sidebar */}
          <aside
            className={`w-full lg:w-64 bg-gray-800 text-white rounded-lg shadow-xl ${
              isMenuOpen ? 'block' : 'hidden'
            } lg:block transition-all duration-300`}
          >
            <nav className="p-4">
              <div className="text-2xl font-bold mb-8 text-center">User Dashboard</div>
              <ul className="space-y-2 rounded-lg">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handlePageChange(item.name)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        activePage === item.name
                          ? 'bg-blue-700 text-white'
                          : 'hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <item.icon className="mr-3 text-gray-300" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-grow bg-gray-200 p-4 lg:w-3/4 shadow-xl md:p-6 lg:ml-8 bg-gray-150 rounded-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                {activePage}
              </h1>
              <div className="">
                <ActiveComponent />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;