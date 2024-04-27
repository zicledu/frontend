import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'react-bootstrap/Pagination';

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination>{items}</Pagination>
    <br />

    <Pagination size="lg">{items}</Pagination>
    <br />

    <Pagination size="sm">{items}</Pagination>
  </div>
);

ReactDOM.render(paginationBasic, document.getElementById('root')); // 렌더링할 DOM 요소의 id를 지정합니다.
