import React, { useEffect } from 'react';

const Home = () => {

  useEffect(()=>{
    document.title=`${import.meta.env.VITE_SITE} | Home `
  },[])

  
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;