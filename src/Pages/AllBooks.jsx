import React, { useEffect } from 'react';

const AllBooks = () => {


    
      useEffect(()=>{
        document.title=`${import.meta.env.VITE_SITE} | All Books `
      },[])

    return (
        <div>
            <h1>all books</h1>
        </div>
    );
};

export default AllBooks;