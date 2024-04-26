import React from 'react'
import '../css/latest.css'
import Latest_Block from './Latest_Block';
const Latest = () => {
  const object1 ={
name:"arun",
last:"jain" 
  }
    const arr=[object1,object1,object1,object1,object1,object1]; 
   
    return (
    <>   
   
   {/* latest  heading component start */} 
  
    <section>
        
    <div className='latest-head'>
        
     <p className='latest-head-para'> Latest posts</p>   
    </div>       
    </section> 


    <section>
        
      <Latest_Block/>
      <Latest_Block/>
      <Latest_Block/>
      
        </section> 
    
     {/* latest heading component end */}  


    </>
  )
}

export default Latest
