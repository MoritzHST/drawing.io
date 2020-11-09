import React from 'react';


class UserPreviewNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }

    }

    componentWillReceiveProps(props) {
        this.setState({
            user: props.user
        })
        console.log(this.state)
    }

    render() {
        return (
            <div>{this.state.user.userName}</div>
        );
    }
}

export default UserPreviewNavigation;