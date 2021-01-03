import React from 'react'
import {withTranslation} from 'react-i18next'
import { NavDropdown  } from 'react-bootstrap';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this)
    }


    changeLanguage(event) {
        this.props.i18n.changeLanguage(event.target.getAttribute("value"))
    }

    render() {
        const {t} = this.props
        return (
            <NavDropdown title={t("language")} id="language-nav-dropdown">
                <NavDropdown.Item  value="en" onClick={this.changeLanguage}> English </NavDropdown.Item>
                <NavDropdown.Item value="de" onClick={this.changeLanguage}> Deutsch </NavDropdown.Item>
            </NavDropdown >
        )
    }
}

export default withTranslation()(LanguageSelector)