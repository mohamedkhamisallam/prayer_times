// 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

 function MediaCard({name,image,time}) {
    console.log('rendeeeeeeeeeeeeeeeeeeeeeeeer');
  return (
    
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='text-center'>
          {name}
        </Typography>
        <Typography variant="h5"  className='text-center text-indigo-700'>
          {time}
        </Typography>
      </CardContent>
      
    </Card>
  );
}


export default React.memo(MediaCard);