import { useTodoContext } from "./TodoContext"

function TodoCounter() {
  const { filteredTodos } = useTodoContext()

  return (
    <>
      <span className="items-left">
        {filteredTodos.length == 0 ? (
          <p>You have no todo items.</p>
        ) : filteredTodos.length == 1 ? (
          <p>{filteredTodos.length} item</p>
        ) : (
          <p>{filteredTodos.length} items</p>
        )}
      </span>
    </>
  )
}
export default TodoCounter
