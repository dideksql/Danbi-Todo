import React from 'react';

//필터 옵션 배열. 
const filters = [
  { id: 0, label: '전체 보기' },
  { id: 1, label: '완료된 항목 숨기기' },
  { id: 2, label: '완료된 항목만 보기' },
];

function Filter({ onChange }) {
    //변경이 되었을 때 호출되는 함수.
  const handleFilterChange = (event) => {
    //선택되면 옵셩의 벨류는 문자를 숫자 변환해서 부모한테 전달.
    onChange(Number(event.target.value));  // 숫자로 바로 변환
  };

  return (
    <select onChange={handleFilterChange}>
      {filters.map((filter) => (
        <option key={filter.id} value={filter.id}>
          {filter.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
