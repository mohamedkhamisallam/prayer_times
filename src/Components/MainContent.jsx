// import Grid from '@mui/material/Grid'; // Grid version 1
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Divider from '@mui/material/Divider';
import Prayer from './Prayer';
import myImage_fajr from '../assets/fajr-prayer.png'
import myImage_duhr from '../assets/dhhr-prayer-mosque.png'
import myImage_asr from '../assets/asr-prayer-mosque.png'
import myimage_maghrib from '../assets/sunset-prayer-mosque.png'
import myImage_aish from '../assets/night-prayer-mosque.png'
import BasicSelect from './BasicSelect';
import axios from 'axios'
import { useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';


function MainContent() {
  const [houres, setHoures] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [today, setToday] = useState('')
  const [currentDay, setcurrentDay] = useState('')
  const [displayCity, setdisplayCity] = useState('الاسكندريه')
  const [city, setcity] = useState('Alexandria')
 const [duration, setduration] = useState([])
 const [timing, settiming] = useState({
  "Fajr": "04:04",

"Dhuhr": "11:51",
"Asr": "15:19",

"Maghrib": "18:19",
"Isha": "19:49",

})
const getDate=()=>{
  let date=new Date()
  setHoures(date.getHours())
  setMinutes(date.getMinutes())
  setSeconds(date.getSeconds())
   
 

}
const getCurrentDate=()=>{
  let date =new Date();
  const options = {  year: 'numeric', month: 'long', day: 'numeric', locale: 'ar' };
  const formattedDate = date.toLocaleDateString('ar', options);

  const arabicNumbers = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
  };

  let arabicDate = '';
  for (let i = 0; i < formattedDate.length; i++) {
    if (/[0-9]/.test(formattedDate[i])) {
      arabicDate += arabicNumbers[formattedDate[i]];
    } else {
      arabicDate += formattedDate[i];
    }
  }
  setToday(date.toLocaleDateString('ar',options))
  const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
 setcurrentDay( daysOfWeek[date.getDay()]);
  console.log(date.getDay());
}

  
  const countdownTimer=()=>{
    const momentNow=moment()
    let Fajr=Object.entries(timing)[0][1].Fajr
    Fajr=moment(Fajr,'hh,mm')
    let Dhuhr=Object.entries(timing)[0][1].Dhuhr
    Dhuhr=moment(Dhuhr,'HH,mm')
    let Asr=Object.entries(timing)[0][1].Asr
    Asr=moment(Asr,'HH,mm')
    let Maghrib=Object.entries(timing)[0][1].Maghrib
    Maghrib=moment(Maghrib,'HH,mm')
    let Isha=Object.entries(timing)[0][1].Isha
    Isha=moment(Isha,'HH,mm')
    console.log(momentNow.isAfter(Fajr),momentNow.isAfter(Dhuhr));
    if(momentNow.isAfter(Fajr)&&momentNow.isBefore(Dhuhr)){
      console.log('next time is duhur');
      setduration(['الظهر',moment.duration(Dhuhr.diff(momentNow)).hours(),moment.duration(Dhuhr.diff(momentNow)).minutes(),moment.duration(Dhuhr.diff(momentNow)).seconds()])
  }else if(momentNow.isAfter(Dhuhr)&&momentNow.isBefore(Asr)){
    console.log('asr');
    setduration(["العصر", moment.duration(Asr.diff(momentNow)).hours(),moment.duration(Asr.diff(momentNow)).minutes(),moment.duration(Asr.diff(momentNow)).seconds()])
  }else if(momentNow.isAfter(Asr)&&momentNow.isBefore(Maghrib)){
    console.log('maghrib');
    
    let midnight=moment('23:59:59','HH:mm:ss')
    let firstTime=momentNow
    let secondTime=Fajr
    let midnightdiff_1=moment.duration(midnight.diff(firstTime))
    let midnightdiff_2=moment.duration(secondTime.diff(moment('00:00:00','HH:mm:ss')))
    let houres=midnightdiff_1+midnightdiff_2
    setduration([  'الفجر', moment(houres).hours(),moment(houres).minutes(),moment(houres).seconds()])

    
    
    

    setduration([ 'المغرب', moment.duration(Maghrib.diff(momentNow)).hours(),moment.duration(Maghrib.diff(momentNow)).minutes(),moment.duration(Maghrib.diff(momentNow)).seconds()])
  }else if(momentNow.isAfter(Maghrib)&&momentNow.isBefore(Isha)){
    console.log(Isha);
    setduration(['العشاء', moment.duration(Isha.diff(momentNow)).hours(),moment.duration(Isha.diff(momentNow)).minutes(),moment.duration(Isha.diff(momentNow)).seconds()])
  }else{

    
    console.log('next fajr')
    if(moment.duration(momentNow.diff(moment('17:44','HH:mm'))).hours()<=0&&moment.duration(momentNow.diff(moment('17:44','HH:mm'))).minutes()<=0){
      let midnight=moment('23:59:59','HH:mm:ss')
      let firstTime=momentNow
      let secondTime=Fajr
      let midnightdiff_1=moment.duration(midnight.diff(firstTime)).hours()
      let midnightdiff_2=moment.duration(secondTime.diff(moment('00:00:00','HH:mm:ss'))).hours()
      let houres=midnightdiff_1+midnightdiff_2
      console.log(houres);
      setduration([  'الفجر', moment(houres).hours(),moment(houres).minutes(),moment(houres).seconds()])
    }else{
              setduration([  'الفجر', moment.duration(Fajr.diff(momentNow)).hours(),moment.duration(Fajr.diff(momentNow)).minutes(),moment.duration(Fajr.diff(momentNow)).seconds()])

    }
    
  }
  }
  const theme=useTheme()
  const fetchData=async()=>{
   let {data}= await axios .get(`https://api.aladhan.com/v1/timingsByCity/23-04-2024?country=EG&city=${city}`)
     settiming(data.data)
     
     
  }
  const displayName=()=>{

  
      if(city==='Alexandria'){
        setdisplayCity('الاسكندريه')
      }else if(city==='Cairo'){
         setdisplayCity('القاهره')
      }else if(city==='Aswan'){
        setdisplayCity('اسوان')
      }
  
  
    
  }
  useEffect(() => {
    displayName()
    fetchData()
    getCurrentDate()
    let interval= setInterval(() => {
      getDate()
     }, 1000);

     return () => clearInterval(interval);

    
  }, [city,displayCity])
  useEffect(() => {
   let countdown= setInterval(() => {
      countdownTimer()
    }, 1000);
  
    return () => {
    clearInterval(countdown)
    }
  }, [timing])
  
  const getCity=useCallback(
    (getcity) => {
      setcity(getcity)
    },
    [city],
  )
  

  
  return (
<>






<div className='mt-[2%] sticky top-10  right-0 left-0'>
  
<Grid container  spacing={2} className='text-black text-center   ' 
sx={theme.palette.mode==='light'?{color:theme.palette.primary.main}:{color:'tomato'} }

>
<Grid  xs={12} md={6}   className='' >
  <div>
    <h3> {currentDay} </h3>
    <h3> {today} </h3>
    <h3> {seconds < 10 ? '0' + seconds : seconds} : {minutes < 10 ? '0' + minutes : minutes} : {houres < 10 ? '0' + houres : houres}</h3>
    </div>
  <div><h1>{displayCity}</h1></div>
  
</Grid>
<Grid  xs={12} md={6} className='  ' >
  <div><h3>متبقي حتي صلاه {duration[0]}</h3></div>
  <div>
    {duration.length>0?<h1>
    {duration[1]}:{duration[2]}:{duration[3]}
  </h1>:<h2>..........loading</h2>}
  </div>
</Grid>
</Grid>
</div>

<Divider   orientation="horizontal" variant="middle"   className='border-orange-800 py-5 mt-20%'  style={{borderColor:'tomato'}}/>

<Stack className='bg-rose-950 mt-70 mt-70' 
sx={{gap:2,m:'10px'}}
 direction={{ xs: 'column',sm:'row', md:'row' }}
 
 alignItems={'center'}
 justifyContent={'space-around'}
 
 
>
    <Prayer name={'الفجر'}time={Object.entries(timing)[0][1].Fajr}  image={myImage_fajr}/>
    <Prayer name={'الظهر'} time={Object.entries(timing)[0][1].Dhuhr} image={myImage_duhr}/>
    <Prayer name={'العصر'} time={Object.entries(timing)[0][1].Asr} image={myImage_asr}/>
    <Prayer name={'المغرب'}time={Object.entries(timing)[0][1].Maghrib}  image={myimage_maghrib}/>
    <Prayer name={'العشاء'} time={Object.entries(timing)[0][1].Isha} image={myImage_aish}/>
    
</Stack>

<Stack position='row'  className='w-[20%]  m-auto'
 justifyContent={'center'}
  >
<BasicSelect getCity={getCity} />
</Stack>


</> 
 )
}

export default MainContent