import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<div>content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App