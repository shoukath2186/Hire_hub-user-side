import { useState } from 'react'
import { axiosInstance } from '../../Modal/APIforaxios'
import { Job } from '../../../datatypes.ts/IJob'
import { CheckValues } from './searchValidation'

interface SearchBarProps {
    setAllJob: (jobs: Job[] | null) => void;
    setReset: (value: boolean) => void;
    reset:boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ setAllJob,setReset,reset }) => {

    const [category, setCategory] = useState<{ _id: string, name: string }[]>([])
    const [Location, setLocation] = useState<{ location: string }[]>([])
    const [select, setSelect] = useState<{ key: string, category: string, location: string }>({ key: '', category: '', location: '' });
    const [error,setError]=useState<string>('')
    

    async function takeCategory() {
        try {
            const response = await axiosInstance.get('/job/allCalegory')
            setCategory(response.data)

        } catch (error) {
            console.log(error);

        }
    }
    async function takeLocation() {
        try {
            const response = await axiosInstance.get('/job/allLocation')
           
            setLocation(response.data)

        } catch (error) {
            console.log(error);

        }

    }
    async function Search() {
         setError('')
        const searchData:any=await CheckValues(select)
          
        //    console.log(101,searchData);
           
        if(searchData.length>0){
            setAllJob(searchData)
        }else if(searchData.length==0){
            const check= !reset
            setError('No search results found.')
            setReset(check);

        }

    }

    return (

        <div className="w-full flex items-center justify-center h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/job-search-icons-blue-background_218381-8576.jpg')", position: 'static' }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 w-[90%] max-w-5xl">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <input type="text" onChange={(e) => setSelect(prevState => ({
                                        ...prevState,
                                        key: e.target.value
                                    }))} className="form-input border rounded-md w-full p-2" value={select.key} placeholder="Keyword" />
                                </div>
                                <div className="col-span-1">
                                    <select
                                        className="form-select border rounded-md w-full p-2"
                                        onClick={takeCategory}
                                        onChange={(e) => setSelect(prevState => ({
                                            ...prevState,
                                            category: e.target.value
                                        }))}
                                        value={select.category}
                                    >
                                        <option value="" >Category</option>
                                        {Array.isArray(category) && category.length > 0 ? (
                                            category.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No categories available.</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <select
                                        className="form-select border rounded-md w-full p-2"
                                        onClick={takeLocation}
                                        onChange={(e) => setSelect(prevState => ({
                                            ...prevState,
                                            location: e.target.value
                                        }))}
                                        value={select.location}
                                    >
                                        <option value="" >Location</option>
                                        {Location && Location.length > 0 ? (
                                            Location.map((loc) => (
                                                <option key={loc.location} value={loc.location}>
                                                    {loc.location}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No locations available.</option>
                                        )}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 mt-4 md:mt-0">
                            <button className="bg-blue-600 text-white border-0 w-full py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                                onClick={Search}
                            >Search</button>
                        </div>
                    </div>
                </div>
                <p className='text-red-700 text-center'>{error}</p>
            </div>
           
        </div>
    )
}

export default SearchBar


