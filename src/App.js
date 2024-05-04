
import Home from "./components/Home";
 
import Myblog from './components/Myblog'
import Addblog from './components/Addblog'
 
import Signup from './components/Signup'
import Signin from './components/Signin'
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';


// Call the config function to load environment variables
 
function App() {
 

// Call the config function to load environment variables

  return (
   
    <>
     <ChakraProvider>      
      
        <BrowserRouter>   
        <Routes>
        
        </Routes> 
       <Routes>
           
          <Route path="/" element={<Home/>} />  
        
          <Route path="/myblog" element={<Myblog/>} />
          <Route path="/addblog" element={<Addblog/>} />
         
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
         
        </Routes> 
        {/* <Footer/> */}
        </BrowserRouter>
        </ChakraProvider>

          </>
         
  );
}

export default App;
