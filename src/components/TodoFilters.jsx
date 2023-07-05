import { useState } from "react"
import { useTodoContext } from "./TodoContext"

function TodoFilters() {
  const { todos, setNewFilter, setNewTodo } = useTodoContext()
  const [active, setActive] = useState()

  function Button({ todos, children, bool }) {
    return (
      <button
        onClick={() => filterTodos(todos, bool, children)}
        className={active == children ? "button-on" : ""}
      >
        {children}
      </button>
    )
  }

  function filterTodos(todos, bool, children) {
    setActive(children)
    if (children === "All") {
      setNewFilter(todos)
    } else if (children === "Active" || children === "Completed") {
      const newList = todos.filter(todo => todo.active === bool)
      setNewFilter(newList)
    } else if (children === "Clear Completed") {
      const newList = todos.filter(todo => todo.active === bool)
      setNewTodo(newList)
      setNewFilter(newList)
    }
  }

  return (
    <>
      <span className="filters">
        <Button todos={todos} bool={null}>
          All
        </Button>
        <Button todos={todos} bool={true}>
          Active
        </Button>
        <Button todos={todos} bool={false}>
          Completed
        </Button>
      </span>
      <Button todos={todos} bool={true}>
        Clear Completed
      </Button>
    </>
  )
}
export default TodoFilters
