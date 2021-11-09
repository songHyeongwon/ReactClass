import React, { useState } from 'react';

const Say = () => {
const[message , setMessage] = useState('기본값');
const onClickEnter = () => setMessage('안녕~~~~~~~~요');
const onClikcLeave = () => setMessage('안녕히 가세요!~~~~~~~~~');

const [color , setColor] = useState('black');

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClikcLeave}>퇴장</button>
            <h1 style={{backgroundColor : color}}>{message}</h1>
            <button onClick={() => setColor('red')}>빨간색</button>
            <button onClick={() => setColor('green')}>초록색</button>
            <button onClick={() => setColor('blue')}>파란색</button>
            
        </div>
    );
};

export default Say;