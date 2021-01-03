import React from 'react';
import {NavDropdown, Navbar} from 'react-bootstrap';
import {withTranslation} from "react-i18next";

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
        const {t} = this.props
        return (
            <div>
                {this.state.user.userName ? <NavDropdown title={this.state.user.userName} id="user-nav-dropdown">

                    </NavDropdown>
                    : <Navbar.Text>{t("user.notLoggedIn")}</Navbar.Text>}</div>
        );
    }
}

export default withTranslation()(UserPreviewNavigation);