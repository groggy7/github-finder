import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import UserProvider from "./context/github/GithubContext"
import AlertProvider from "./context/alert/AlertContext"
function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />}/>
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  )
}

export default App