import { useRef } from "react"
import TodoFilters from "./TodoFilters"
import TodoCounter from "./TodoCounter"
import { useTodoContext } from "./TodoContext"
import "../Todo.css"
import deleteIcon from "../assets/images/icon-cross.svg"
import iconChecked from "../assets/images/icon-check.svg"
import lightThemeIcon from "../assets/images/icon-sun.svg"
import darkThemeIcon from "../assets/images/icon-moon.svg"
import lightThemeBg from "../assets/images/bg-desktop-light.jpg"
import darkThemeBg from "../assets/images/bg-desktop-dark.jpg"
import { useTheme } from "./TodoContext"

function Todo() {
  const { todos, setNewTodo, filteredTodos, setNewFilter } = useTodoContext()
  const { theme, toggleTheme } = useTheme()
  const inputValue = useRef(null)
  const dragItem = useRef()
  const dragOverItem = useRef()

  const handleEnterKey = e => {
    //adds todo item when enter key is pressed
    if (e.key === "Enter") {
      addTodo()
    }
  }

  function addTodo() {
    //adds todo item if circle is clicked instead
    let newTodo = inputValue.current.value
    let todoObj = {
      todo: newTodo,
      id: newTodo.replaceAll(" ", "").substring(0, 10),
      active: true
    }
    setNewTodo([...todos, todoObj])
    inputValue.current.value = ""
    setNewFilter([...todos, todoObj])
  }

  const todoChecked = (todo, index) => {
    // sets the todo active property to false when user clicks
    // and sets it back to true when user clicks again
    const newTodoArray = [...todos]
    let newerTodo = todo
    if (todo.active) {
      newerTodo = { ...todo, active: false }
    } else {
      newerTodo = { ...todo, active: true }
    }
    newTodoArray[index] = newerTodo
    setNewTodo(newTodoArray)
    setNewFilter(newTodoArray)
  }

  const deleteTodo = each => {
    const newList = todos.filter(todo => todo.id !== each.id)
    setNewTodo(newList)
    setNewFilter(newList)
  }

  // the three functions below enable the todo lists to be reordered by dragging
  const dragStart = position => {
    dragItem.current = position
  }

  const dragEnter = position => {
    dragOverItem.current = position
  }

  const drop = () => {
    const copyListItems = [...todos]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    setNewTodo(copyListItems)
    setNewFilter(copyListItems)
    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <div className="wrapper">
      {theme === "light" ? (
        <img src={lightThemeBg} alt="light theme background pic" />
      ) : (
        <img src={darkThemeBg} alt="dark theme background pic" />
      )}
      <div className="todo-wrapper">
        <div className="title">
          <h1>TODO</h1>
          {theme === "light" ? (
            <img
              style={{ cursor: "pointer" }}
              src={lightThemeIcon}
              alt="light theme icon"
              onClick={toggleTheme}
              aria-label="dark mode toggle"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src={darkThemeIcon}
              alt="dark theme icon"
              onClick={toggleTheme}
              aria-label="dark mode toggle"
            />
          )}
        </div>
        <div className="input-area">
          <button className="input-button" onClick={addTodo}></button>
          <input
            type="text"
            placeholder="Create a new todo"
            ref={inputValue}
            onKeyDown={handleEnterKey}
          />
        </div>
        {todos.length == 0 && (
          <p className="empty-todo-prompt">
            Type into the box above and hit "Enter" to add a new todo
          </p>
        )}
        <div className="wrap-list-body">
          <ul className="todo-lists">
            {filteredTodos.map((each, index) => {
              return (
                <div
                  className={`todo-item active-${each.active}`}
                  key={each.id}
                >
                  <div
                    className="check-circle-wrapper"
                    onClick={() => {
                      todoChecked(each, index)
                    }}
                  >
                    <img
                      src={iconChecked}
                      alt="Todo ticked icon"
                      className="check-circle"
                    />
                  </div>
                  <li
                    className="todo-li"
                    onDragStart={() => dragStart(index)}
                    onDragEnter={() => dragEnter(index)}
                    onDragEnd={drop}
                    draggable
                  >
                    {each.todo}
                  </li>
                  <img
                    src={deleteIcon}
                    className="delete-list"
                    onClick={() => deleteTodo(each)}
                  ></img>
                </div>
              )
            })}
          </ul>
          <div className="todo-footer">
            <TodoCounter />
            <TodoFilters />
          </div>
        </div>
        {filteredTodos.length > 1 && (
          <p className="drag-text">Drag and drop to reorder list</p>
        )}
      </div>
    </div>
  )
}
export default Todo
