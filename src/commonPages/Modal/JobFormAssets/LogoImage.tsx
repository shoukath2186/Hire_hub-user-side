

// import { useState } from 'react'
// import { Grid, TextField } from "@mui/material"

// interface LogoImageProps {
//   setCompanyLogo: (value: File | null) => void;
//   error: string;
//   logo?:string;
// }

// const LogoImage: React.FC<LogoImageProps> = ({ setCompanyLogo, error,logo=null }) => {
//   const [displayLogo, setDisplayLogo] = useState<string|null>(logo);

  

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setDisplayLogo(imageUrl);
//       setCompanyLogo(file);
//     }
//   };

//   return (
//     <>
//       <Grid item xs={12} sm={6}>
//         Company Logo
//         <TextField
//           fullWidth
//           type="file"
//           id='companyLogo'
//           name='companyLogo'
//           autoFocus
//           onChange={handleFileChange}
//           error={!!error}
//           helperText={error}
//           inputProps={{ accept: 'image/*' }}
//           sx={{ mt: 2 }}
//         />
//       </Grid>
//       <div style={{ marginTop: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
//         {displayLogo ? (
//           <img 
//             src={displayLogo} 
//             alt="Company Logo" 
//             style={{ margin: '16px', width: '150px', height: 'auto', objectFit: 'contain' }} 
//           />
//         ) : null}
//       </div>
//     </>
//   )
// }

// export default LogoImage