import { useEffect, useState } from 'react';
import { axiosInstance } from '../Modal/APIforaxios';
import { toast } from 'react-toastify';
import UserProfileModal from '../Modal/UserProfileViewModal/UserProfileModal';

interface Application {
    _id: string;
    jobTitle: string;
    applicantName: string;
    email: string;
    appliedDate: string;
    status: string;
}
import { UserProfile } from '../../datatypes.ts/IJobProfile';

const EmployerApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [change, setChange] = useState<boolean>(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axiosInstance.get('/job/applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
                toast.error('Failed to fetch applications');
            }
        };

        fetchApplications();
    }, [change]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        axiosInstance.patch(`/job/updateStatus?id=${id}&status=${event.target.value}`)
            .then((res) => {
                toast.success(res.data);
                setChange((val) => !val);
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Failed to update status');
            });
    };

    const viewProfileFunction = async (id: string) => {
        try {
            const response = await axiosInstance.get(`/job/applicantProfile?id=${id}`);
            //console.log(12212,response.data); 
            
            setSelectedProfile(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to fetch profile');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProfile(null);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 min-h-screen rounded-lg bg-gray-50">
            <UserProfileModal userProfile={selectedProfile} isModalOpen={isModalOpen} closeModal={closeModal} />

            <h2 className="text-3xl font-bold mb-8 text-yellow-600 border-b-2 border-blue-200 pb-4">Applications</h2>
            {applications.length === 0 ? (
                <p className="text-blue-600 text-lg">No applications found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-blue-200">
                        <thead className="bg-gray-600">
                            <tr>
                                {['Job Title', 'Applicant Name', 'Email', 'Applied Date', 'Profile', 'Status'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-blue-100">
                            {applications.map((application, index) => (
                                <tr key={application._id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                                        {application.jobTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {application.applicantName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {application.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(application.appliedDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <button onClick={() => viewProfileFunction(application._id)} className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:ring-offset-2">
                                            View
                                        </button>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">
                                        <select
                                            value={application.status}
                                            onChange={(e) => handleChange(e, application._id)}
                                            className="block w-full py-2 border border-blue-300 bg-blue-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            {['Pending', 'Accepted', 'Rejected'].map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployerApplications;
