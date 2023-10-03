export default function FilterTodoForm({
  filter,
  onInputChange
}) {
  return (
    <div>
      <label htmlFor="idFilter">ID: </label>
      <input
        type='text'
        id="idFilter"
        name='idFilter'
        placeholder='ID'
        value={filter.id}
        onChange={(e) => onInputChange(e)}
      />
      <label htmlFor="deadlineFilter">期限: </label>
      <input
        type='date'
        id="deadlineFilter"
        name='deadline'
        value={filter.deadline}
        onChange={(e) => onInputChange(e)}
      />
      <select value={filter.status} onChange={(e) => onInputChange(e)}>
        <option value="">すべて</option>
        <option value="notStartYet">未着手</option>
        <option value="inProgress">進行中</option>
        <option value="completed">完了</option>
      </select>
    </div>
  )
}

