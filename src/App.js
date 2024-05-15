import Home from "./components/Home";
import Myblog from "./components/Myblog";
import Addblog from "./components/Addblog";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myblog" element={<Myblog />} />
            <Route path="/addblog" element={<Addblog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}
export default App;
