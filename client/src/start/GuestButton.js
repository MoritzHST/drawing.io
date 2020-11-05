import React from 'react';
import Button from "../shared/Button"

class GuestButton extends React.Component {
    render() {
        const playAsGuest = 'Play as Guest';

        return (
            <Button className="guest-button" label={playAsGuest} />
        );
    }
}

export default GuestButton;