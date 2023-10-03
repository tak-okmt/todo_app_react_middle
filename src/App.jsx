import { useEffect, useState } from 'react'
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import TodoList from "./TodoList";
import FilterTodoForm from './FilterTodoForm';

function App() {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({}); // 編集中のTodoリストのstate

  const [filter, setFilter] = useState({ id: '', deadline: '', status: '' });
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
          id: todos.length + 1,
          title: todo.title,
          detail: todo.detail,
          deadline: todo.deadline,
          status: todo.status || 'notStartYet'
        }
      ])
    }

    setTodo({});
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
          onEditFormSubmit={handleEditFormSubmit}
          onEditInputChange={handleEditInputChange}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )
      }
      <FilterTodoForm
        filter={filter}
        onInputChange={handleFilterChange}
      />

      <br /><br />

      <TodoList
        todos={filteredTodos}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App
