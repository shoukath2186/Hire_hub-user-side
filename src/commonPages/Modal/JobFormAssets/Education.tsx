

import { Grid } from '@mui/material'
import { preferredEducation } from '../../../entities/data';
import { useState } from 'react';

const Education: React.FC<{
    education: string;
    setEducation: (value: string) => void;
    error: string;
}> = ({ education, setEducation, error }) => { 

    const [allCategory] = useState<string[]>(preferredEducation);

   
    return (
        <>
            <Grid item xs={12} sm={12}>
            Education
                <select
                    value={education}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEducation(e.target.value)}
                    style={{ width: '100%', padding: '8px', height: '57px', borderRadius: '4px', border: '1px solid #ccc', marginTop:'16px'}}
                >

                    <option value="">Select Education</option>

                    {allCategory && allCategory.length > 0 ? (
                        allCategory.map((category) => (
                            <option key={category} value={category} >
                                {category}
                            </option>
                        ))
                    ) : (
                        <option disabled>No Education available.</option>
                    )}
                </select>
                <p style={{ color: 'red' }}>{error}</p>
            </Grid>
           
        </>
    )
}
export default Education