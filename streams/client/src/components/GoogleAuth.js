import React from 'react';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    }

    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            window.gapi.client.init({
                clientId: '367224979597-pb751h2rh9q7ob9n0rn7f8brtajuo1g5.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });

    }

    onAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        })
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null
        } else if (this.state.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOut}
                    className='ui red google button'>
                    <i className='google icon'></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button
                    onClick={this.onSignIn}
                    className='ui green google button'>
                    <i className='google icon'></i>
                    Sign In
                </button>
            )
        }
    }

    render() {
        return <div>
            {this.renderAuthButton()}
        </div>
    }
}

export default GoogleAuth;