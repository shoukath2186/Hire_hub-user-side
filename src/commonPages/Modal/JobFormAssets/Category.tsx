


import { Grid } from '@mui/material'
import axios from 'axios';
import  { useEffect, useState } from 'react'

const Category: React.FC<{
    category: string;
    setCategory: (value: string) => void;
    error: string;
}> = ({ category, setCategory, error }) => {

    const [allCategory, setAllCategory] = useState<{ _id: string, name: string }[]>([]);

    async function getCategory() {
        try {
            const response = await axios.get('http://localhost:3000/job/allCalegory')
            await setAllCategory(response.data)
        } catch (error) {
            console.log(2222, error);
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <>
            <Grid item xs={12} sm={6}>
                <select
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px', height: '57px', borderRadius: '4px', border: '1px solid #ccc' }}
                >

                    <option value="">Select Job Category</option>

                    {allCategory && allCategory.length > 0 ? (
                        allCategory.map((category) => (
                            <option key={category._id} value={category._id} >
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No categories available.</option>
                    )}
                </select>
                <p style={{ color: 'red' }}>{error}</p>
            </Grid>
        </>
    )
}
export default Category