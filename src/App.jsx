import Calendar from "./components/Calendar";
import InputTodo from "./components/InputTodo";
import TodayTodo from "./components/TodayTodo";
import TodoList from "./components/TodoList";

function App() {
    return (
        <>
            <Calendar />
            <TodayTodo />
            <InputTodo />
            <TodoList />
        </>
    );
}

export default App;
