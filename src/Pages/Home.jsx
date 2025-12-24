import React, { useEffect } from 'react';
import Wraper from '../Components/Wraper';
import MyCarousel from '../Components/Home/MyCarousel';

const Home = () => {

  useEffect(()=>{
    document.title=`${import.meta.env.VITE_SITE} | Home `
  },[])

  
  return (
    <div>

        <MyCarousel/>

    </div>
  );
};

export default Home;