// import React from 'react';
import { Work, People, Assessment, Add } from '@mui/icons-material';

import { SvgIconProps } from '@mui/material';
import  { ReactElement } from 'react';
interface DashboardCardProps {
  icon: ReactElement<SvgIconProps>;
  title: string;
  content: string;
  action?: boolean;
}

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={<Work className="text-blue-500" fontSize="large" />}
            title="Active Jobs"
            content="5 open positions"
          />
          <DashboardCard
            icon={<People className="text-green-500" fontSize="large" />}
            title="applications"
            content="27 new applications"
          />
          <DashboardCard
            icon={<Assessment className="text-yellow-500" fontSize="large" />}
            title="Interviews"
            content="3 scheduled this week"
          />
          <DashboardCard
            icon={<Add className="text-purple-500" fontSize="large" />}
            title="Post New Job"
            content="Create a new listing"
            action
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Application</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5,9].map((item) => (
                <li key={item}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Applicant Name {item}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            New
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Applied for: Software Engineer
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>Applied 2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, content, action = false }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{content}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    {action && (
      <div className=" px-5 py-3">
        {/* <div className="text-sm">
          <button className="font-medium text-indigo-600 hover:text-indigo-500">
            Create new job
          </button>
        </div> */}
      </div>
    )}
  </div>
);

export default EmployerDashboard;