import { Route,BrowserRouter,Routes } from "react-router-dom"
import  React from "react"
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { SuccessPage } from "./pages/SuccessPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/success" element={<SuccessPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
