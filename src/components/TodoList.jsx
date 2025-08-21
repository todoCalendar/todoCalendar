import React from "react";

const TodoList = () => {
    return (
        <aside>
            <h3>TODO LIST</h3>
            {/*필터 컴포넌트 추가되는 영역*/}

            <button>선택삭제</button>
            <button>전체삭제</button>
            <ul>
                <li>
                    <span>1</span>
                    <div>
                        <input type="checkbox" /> 청소하기
                    </div>
                    <div>
                        <input type="checkbox" /> 설거지하기
                    </div>
                </li>
                <li>
                    <span>2</span>
                    <div>
                        <input type="checkbox" /> 청소하기
                    </div>
                    <div>
                        <input type="checkbox" /> 설거지하기
                    </div>
                </li>
                <li>
                    <span>3</span>
                    <div>
                        <input type="checkbox" /> 청소하기
                    </div>
                    <div>
                        <input type="checkbox" /> 설거지하기
                    </div>
                </li>
                <li>
                    <span>4</span>
                    <div>
                        <input type="checkbox" /> 청소하기
                    </div>
                    <div>
                        <input type="checkbox" /> 설거지하기
                    </div>
                </li>
                <li>
                    <span>5</span>
                    <div>
                        <input type="checkbox" /> 청소하기
                    </div>
                    <div>
                        <input type="checkbox" /> 설거지하기
                    </div>
                </li>
            </ul>
        </aside>
    );
};

export default TodoList;
