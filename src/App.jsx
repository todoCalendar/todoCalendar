import Calendar from "./components/Calendar";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

function App() {
    return (
        <>
            <div className="main-content">
                <Calendar />
                <InputTodo />
            </div>
            <TodoList />
        </>
    );
}

export default App;
