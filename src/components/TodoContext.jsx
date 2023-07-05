import { createContext, useContext, useEffect, useState } from "react"

const TodoContext = createContext()

export const TodoContextProvider = ({ children }) => {
  const initialTodo = localStorage.getItem("todos")
  const initialFilteredTodo = localStorage.getItem("filteredTodos")

  const [todos, setNewTodo] = useState(() =>
    initialTodo ? JSON.parse(initialTodo) : []
  )
  const [filteredTodos, setNewFilter] = useState(() =>
    initialFilteredTodo ? JSON.parse(initialTodo) : []
  )

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("filteredTodos", JSON.stringify(filteredTodos))
  }, [todos, filteredTodos])

  return (
    <TodoContext.Provider
      value={{ todos, setNewTodo, filteredTodos, setNewFilter }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)

const themeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    theme === "light"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark")

    return theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  )
}

export const useTheme = () => useContext(themeContext)
