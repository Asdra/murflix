import React from "react";
import Router from 'next/router';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        if (sessionStorage.getItem("murflix_token")) {
            let token = sessionStorage.getItem("murflix_token");
            const response = await fetch("/api/login", {
                method: 'POST',
                body: JSON.stringify({ token })
            });

            if (response.status == "200") {
                Router.push("/");
            }
        }
    }


    async submit(event) {
        
        event.preventDefault();

        const password = document.getElementById("password").value;
        const response = await fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({ password })
        });

        if (response.status == "405") {
            this.setState({ error: true });
            return;
        }

        const body = await response.json();
        sessionStorage.setItem("murflix_token", body.token);
        this.props.setToken(body.token);
    }

    render() {
        return (<div id="login_wrapper">
            <div id="modal">
                <div id="modal_header">
                    <img src="/images/murflix.svg"></img>
                </div>
                <div id="modal_content">
                    <form id="formLogin" onSubmit={this.submit}>
                        <div className="form_group">
                            <label htmlFor="password">You shall not pass !!</label>
                            <input type="password" id="password" clas="myInput"></input>
                            {this.state.error &&
                                <label htmlFor="password">Erreur d'authentification</label>}
                        </div>
                        <div className="form_submit">
                            <button type="submit" onClick={this.submit}>Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
            <style jsx>{`
#login_wrapper {
    width: 100%;
    height: 100%;
    background-image: url('/images/cinema${Math.round(Math.random() * 10 % 4 + 1)}.jpg');
    background-size: cover;
    background-position-x: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

#modal {
    max-width: 90%;
    width: 25em;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 1em;
    margin-bottom: 10%;
}

#modal_header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3em;
}

#modal_header img {
    height: 5em;
}

#modal_content {
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2em;
}

#formLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form_group {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
}

.form_group label {
    color: #bbb;
    text-shadow: 1px 1px black;
    font-size: 1.1em;
    padding-bottom: 0.4em;
    padding-left: 0.1em;
    text-align: center;
}

.form_group input {
    font-size: 1.3em;
    background-color: #444!important;
    border: none;
    border-radius: 0.2em;
    outline: none;
    padding: 0.4em 0.4em 0.2em;
    box-shadow: 1px 1px 2px black inset, 2px 2px 7px black;
    color: #bbb;
    -webkit-text-fill-color: #bbb;
    -webkit-box-shadow:0 0 0 500px #444 inset, 1px 1px 2px black inset, 2px 2px 7px black;
    text-shadow: 1px 1px black;
    text-align: center;
}
.form_group input:-webkit-autofill,
.form_group input:-webkit-autofill:hover, 
.form_group input:-webkit-autofill:focus {
    font-size: 1.3em;
    background-color: #444!important;
    border: none;
    border-radius: 0.2em;
    outline: none;
    padding: 0.4em 0.4em 0.2em;
    box-shadow: 1px 1px 2px black inset, 2px 2px 7px black;
    color: #bbb;
    -webkit-text-fill-color: #bbb;
    -webkit-box-shadow:0 0 0 500px #444 inset, 1px 1px 2px black inset, 2px 2px 7px black;
    text-shadow: 1px 1px black;
    text-align: center;
}

.form_submit {
    padding-top: 2em;
    padding-bottom: 3em;
}

.form_submit button {
    background-color: rgb(180, 15, 15);
    border:none;
    color: #bbb;
    text-shadow: 1px 1px black;
    padding: 0.6em 1em;
    border-radius: 0.3em;
}
`}</style>
        </div>
        );
    }
}