import { useEffect, useState } from 'react'
import AddTodoForm from "./components/AddTodoForm";
import EditTodoForm from "./components/EditTodoForm";
import TodoList from "./components/TodoList";
import FilterTodoForm from './components/FilterTodoForm';

function App() {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({}); // 編集中のTodoリストのstate

  const [filter, setFilter] = useState({});
  const [filteredTodos, setFilteredTodos] = useState([])

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo.title === '' || todo.title === undefined) {
      alert('タイトルの入力が必要です');
      return;
    } else {
      setTodos([
        ...todos,
        {
          id: todoId,
          title: todo.title,
          detail: todo.detail,
          deadline: todo.deadline,
          status: todo.status || 'notStartYet'
        }
      ])
      setTodoId((id) => id + 1);
    }

    setTodo({}); // HACK: 初期化されていない
  }

  function handleInputChange(e) {
    const target = e.target;
    setTodo({ ...todo, [target.name]: target.value });
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo(todo);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    const updatedTodos = todos.map((todo) => {
      return todo.id === currentTodo.id ? currentTodo : todo
    });
    setIsEditing(false);
    setTodos(updatedTodos);
  }

  function handleEditInputChange(e) {
    const target = e.target;
    setCurrentTodo({ ...currentTodo, [target.name]: target.value });
  }

  function handleDeleteClick(todo) {
    const deletedTodos = todos.filter(t => t.id !== todo.id);
    setTodos(deletedTodos);
  }

  function handleFilterChange(e) {
    const target = e.target;
    setFilter({ ...filter, [target.name]: target.value });
  }

  const filteringTodos = () => {
    const newArray = todos.filter((todo) => {
      if (filter.id && filter.id !== todo.id) {
        return false;
      }
      if (filter.deadline && filter.deadline !== todo.deadline) {
        return false;
      }
      if (filter.status && filter.status !== todo.status) {
        return false;
      }
      return todo;
    })
    setFilteredTodos(newArray)
  }

  useEffect(() => {
    filteringTodos()
  }, [filter, todos])

  return (
    <div style={{ margin: '0px 200px' }}>
      {isEditing ? (
        <EditTodoForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          handleEditFormSubmit={handleEditFormSubmit} // TODO: レビュー指摘反映：名前を統一する
          handleEditInputChange={handleEditInputChange}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
      )
      }
      <br /><br />

      <FilterTodoForm
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <TodoList
        todos={filteredTodos}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App
