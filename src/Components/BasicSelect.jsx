import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material';

 function BasicSelect({getCity}) {
    console.log('rendeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer');
    const theme=useTheme().palette.mode
    console.log(theme);
  const [city, setCity] = useState('Alexandria');

  const handleChange = (event) => {
    setCity(event.target.value);
    
    
  };
  useEffect(() => {
    getCity(city)
  }, [city])
  
  console.log(city);

  return (
    <Box sx={{ minWidth: 120,marginTop:'20px' }}  className='test' >
        
      <FormControl fullWidth    >
        <InputLabel id="demo-simple-select-label" sx={theme==='light'?{color:'black'}:{color:'white'} }>المدينه</InputLabel >
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Age"
          onChange={handleChange}
          sx={theme==='light'?{color:'black'}:{color:'tomato'} }
        >
        <MenuItem value={'Alexandria'}>الاسكندريه</MenuItem>
          <MenuItem value={'Cairo'} >القاهره</MenuItem>
          <MenuItem value={'Aswan'}>اسوان</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default React.memo(  BasicSelect);