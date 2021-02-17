import React from 'react';
import notFoundImage from '../images/cat.jpg';

export default function NoTask() {
    return (
        <div style={{textAlign: 'center'}}>
            <img src={notFoundImage} />
            <h1>No Tasks Found</h1>
        </div>
    )
}
