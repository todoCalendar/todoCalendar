function InputTodo() {
    return (
        <div className="input-todo">
            <div className="view-box">
                <strong>2일 토요일</strong>
                <ul className="todaylist">
                    <li>
                        <input type="checkbox" id="inputList" />
                        <label htmlFor="inputList">청소하기</label>
                    </li>
                </ul>
            </div>

            <div className="add-box">
                <input
                    type="text"
                    id="inputText"
                    placeholder="할일을 입력해주세요"
                />
                <div className="btn-box">
                    <button type="button" className="add-btn btn">
                        추가
                    </button>
                    <button type="button" className="repeat-btn btn">
                        반복
                    </button>
                    <ul className="repeat-list">
                        <li>매일마다</li>
                        <li>매주마다</li>
                        <li>매월마다</li>
                        <li>매년마다</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InputTodo;
