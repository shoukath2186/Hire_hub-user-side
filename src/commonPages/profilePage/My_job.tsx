import { useState, useEffect } from 'react';
import { axiosInstance } from '../Modal/APIforaxios';
import { useNavigate } from 'react-router-dom';

interface Application {
  _id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  createdAt: string;
}

const My_job: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate=useNavigate()

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
        return 'text-yellow-500 bg-yellow-100';
      case 'accepted':
        return 'text-green-500 bg-green-100';
      case 'rejected':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

   const takeJobData =async (application: any) => {
    console.log(application);

    
    try {
      const {data}=await axiosInstance.get(`/profile/getApplicationJob?jobId=${application.jobId}`)

      console.log(data[0]);
      
       navigate('/jobDetails', { state: { jobDetails: data[0] } });
      
    } catch (error) {
      console.log(error);
      
    }
   
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600 py-8 text-lg">No applications found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow-lg mt-6">
          <table className="min-w-full table-auto bg-white border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">No</th>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">Job Title</th>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">Company</th>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">Applied On</th>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">Job</th>
                <th className="text-left py-3 px-6 font-semibold text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, i) => (
                application.jobTitle ? (
                  <tr
                    key={application._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="py-4 px-6 text-sm text-gray-700">{i + 1}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{application.jobTitle}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{application.companyName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{new Date(application.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <button className="text-blue-500 hover:underline" onClick={() => takeJobData(application)}>View</button>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default My_job;
