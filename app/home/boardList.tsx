import React from 'react';

interface Interface {
  data: string[]
}

function BoardList({ data }: Interface) {
  return (
    <div>
      {data.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

export default BoardList;
