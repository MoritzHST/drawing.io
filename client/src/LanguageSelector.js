import React from 'react'
import {withTranslation} from 'react-i18next'

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this)
    }


    changeLanguage(event) {
        this.props.i18n.changeLanguage(event.target.value)
    }

    render() {
        return (
            <div onChange={this.changeLanguage}>
                <input type="radio" value="en" name="language" defaultChecked/> English
                <input type="radio" value="de" name="language"/> Deutsch
            </div>
        )
    }
}

export default withTranslation()(LanguageSelector)