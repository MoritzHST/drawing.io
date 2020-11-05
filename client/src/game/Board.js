import React, { Component } from 'react';

class Board extends React.Component {
    render() {
        const helloWorld = 'Hello World';

        return (
            <div>
                <div className="status">{helloWorld}</div>
            </div>
        );
    }
}

export default Board;