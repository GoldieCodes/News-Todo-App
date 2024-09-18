import { Routes, Route, NavLink } from "react-router-dom"
import Home from "./Home"
import Todo from "./Todo"
import { TodoContextProvider } from "./TodoContext"
import { ThemeContextProvider } from "./TodoContext"

const Nav = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>Goldie</h1>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/todo" className="nav-item">
            My To-Do
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todo"
          element={
            <ThemeContextProvider>
              <TodoContextProvider>
                <Todo />
              </TodoContextProvider>
            </ThemeContextProvider>
          }
        />
      </Routes>
    </>
  )
}
export default Nav
