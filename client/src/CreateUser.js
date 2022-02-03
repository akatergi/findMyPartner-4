import React, { Component } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CreateUser() {
    const navigate = useNavigate()
    return <CreateUserM navigate={navigate} />
}

class CreateUserM extends Component {
    state = {
        username: "",
        password: "",
        languages: "",
        description: "",
        skills: "",
        image: "",
        email: "",
        errMessage: ""
    }

    handlePost = e => {
        e.preventDefault()
        axios.post("http://localhost:5000/create", this.state, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(res => res.data)
            .then(res => {console.log(res,res.success,res.errMessage); res.success === false ? this.setState({errMessage: res.errMessage}) : this.props.navigate("/login")})
            .catch(e => console.log(e))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handlePost} className="container">
                {this.state.errMessage.length ? <div className="alert alert-danger" role="alert">
                    {this.state.errMessage}
                </div> : ""}
                <h1 className="display-3 text-center mt-2 mb-3">Create Account</h1>
                <div className="row">
                    <div className="col-4 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="Username"> Username </label>
                            <input required className="form-control" type="username" name="username" placeholder="coder123" id="Username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-4 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="email" > E-mail </label>
                            <input required className="form-control" type="text" name="email" placeholder="name@example.com" id="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-4 mb-3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="password" > Password </label>
                            <input required className="form-control" type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="languages" > Languages </label>
                            <input required className="form-control" type="text" name="languages" id="languages" value={this.state.languages} onChange={this.handleChange} placeholder='eg: Python, Java, C++, ...' />
                            <div className="form-text">Input all coding languages you are well versed with <b>seperated by spaces</b></div>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="skills" > Skills </label>
                            <input required className="form-control" type="text" name="skills" id="skills" value={this.state.skills} onChange={this.handleChange} placeholder='eg: Algorithms, Data Structures, Front-end Development, ...' />
                            <div className="form-text">Input all skills you have in the area of coding <b>seperated by spaces</b></div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="description" > description </label> <br />
                            <textarea required name="description" id="description" className="form-control" value={this.state.description} onChange={this.handleChange} />
                            <div className="form-text">Provide a description to introduce yourself to all potential project partners!</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="image" > Image URL </label>
                            <input className="form-control" type="text" name="image" id="image" value={this.state.image} onChange={this.handleChange} />
                            <div className="form-text">Provide a link to the image you would like to use as your profile picture</div>
                        </div>
                    </div>
                    <button className="btn mt-3 btn-warning"> Submit </button>
                </div>
            </form>
        )
    }
}

export default CreateUser;