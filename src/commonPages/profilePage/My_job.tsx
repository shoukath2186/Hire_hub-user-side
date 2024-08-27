import { useState, useEffect } from 'react';
import { axiosInstance } from '../Modal/APIforaxios';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  createdAt: string;
}

const My_job: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance.get('/profile/seekerpAplications')
      .then(response => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'accepted':
        return 'bg-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div></div>;

  return (
    <>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600 py-8 text-lg">No applications found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className=" text-center py-3 px-4 font-semibold text-sm">No</th>
                <th className=" text-center py-3 px-4 font-semibold text-sm">Job Title</th>
                <th className=" text-center py-3 px-4 font-semibold text-sm">Company</th>
                <th className=" text-center py-3 px-4 font-semibold text-sm">Applied On</th>
                <th className=" text-center py-3 px-4 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application,i )=> (
                application.jobTitle?(
                  <tr key={application.id} className="border-b last:border-0">
                  <td className="py-3 text-center px-4 text-sm text-gray-700">{i+1}</td>
                  <td className="py-3 text-center px-4 text-sm text-gray-700">{application.jobTitle}</td>
                  <td className="py-3 text-center px-4 text-sm text-gray-600">{application.companyName}</td>
                  <td className="py-3 text-center px-4 text-sm text-gray-600">{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-center px-4 text-sm">
                    <span className={`inline-block py-1 px-2 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  
                </tr>
                ):null
                
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default My_job;
