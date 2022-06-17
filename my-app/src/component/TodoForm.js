import TodoList from './TodoList';

export default function TodoForm () {
    return (
      <div style={{ padding: 32 }}>
        <h1 className='title'>To do list</h1>
        <TodoList></TodoList>
      </div>
    );
}