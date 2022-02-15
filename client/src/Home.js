import React, { Component } from 'react';
import "./Home.css"

class Home extends Component {
    render() {
        return (
            <div id="HomePage">
                <div className="container">
                    <div className="row">
                        <h1 className="display-1 text-center mb-4 mt-4">Welcome to findMyPartner</h1>
                        <p className="homepar text-center"> The start of your dream projects. With this website, you no longer need to worry about having to make big projects on your
                            own, not having the right connections, or simply being short on members on your team. You can browse through our entire database of users to find exactly
                            what you're looking for! Whether it be a user that matches your profile, a user that matches what you're specifically looking for, or something else, this
                            website will find you an ideal match with the press of a few buttons. Press the buttons below to get started. Contact me at <b>akatergi20@gmail.com</b> for 
                            any concerns, feedback, or inquiries about this project!
                        </p>
                        <div className="col-8 offset-2">
                            <a id="regBtn" className="btn btn-large btn-warning myButton" href="/create"> Register </a>
                            <p className="homelog"> Already have an account? </p>
                            <a id="logBtn" className="btn btn-large btn-success myButton" href="/login"> Login </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home