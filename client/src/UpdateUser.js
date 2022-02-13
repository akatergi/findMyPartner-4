import React, { Component } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpdateUser() {
    const navigate = useNavigate()
    return <UpdateUserM navigate={navigate} />
}

class UpdateUserM extends Component {
    state = {
        username: "",
        password: "",
        languages: "",
        description: "",
        skills: "",
        image: "",
        email: "",
        success: false,
        errMessage: "",
        _id: null,
        logged: false
    }

    handlePost = e => {
        e.preventDefault()
        axios.post("update", this.state, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(res => {console.log(res.data); return res.data})
            .then(res => {
                if(!res.success) {console.log(1); this.setState({ errMessage: res.errMessage })}
                else{console.log(2); this.props.navigate(`/users/${this.state._id}`)}})
            .catch(e => console.log(e))
    }

    handleChange = e => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentDidMount = () => {
        axios.get(`isLogged`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(res => res.data).then(e => { e.success ? this.setState({ success: true, languages: e.user.languages.toString(), skills: e.user.skills.toString(), username: e.user.username, _id:e.user._id, password: e.user.password, description: e.user.description, email: e.user.email, image: e.user.image }) : this.setState({ success: false }) })
    }

    render() {
        if (!this.state._id) return <h1 className="display-3 py-4 text-danger bg-warning text-center"><b>You must be signed in to view this page</b></h1>
        return (
            <form onSubmit={this.handlePost} className="container">
                {this.state.errMessage.length ? <div className="alert alert-danger" role="alert">
                    {this.state.errMessage}
                </div> : ""}
                <h1 className="display-3 text-center mt-2 mb-3">Edit Account</h1>
                <div className="row">
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="username"> Username </label>
                            <input required className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} maxlength='20'/>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="email" > E-mail </label>
                            <input required className="form-control" type="text" name="email" placeholder="name@example.com" id="email" value={this.state.email} onChange={this.handleChange} maxlength='65'/>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="languages" > Languages </label>
                            <input required className="form-control" type="text" name="languages" id="languages" value={this.state.languages} onChange={this.handleChange} placeholder='eg: Python, Java, C++, ...' maxlength='65'/>
                            <small className="sub">Input all coding languages you are well versed with <b>seperated by commas</b></small>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="skills" > Skills </label>
                            <input required className="form-control" type="text" name="skills" id="skills" value={this.state.skills} onChange={this.handleChange} placeholder='eg: Algorithms, Data Structures, Front-end Development, ...' maxlength='65'/>
                            <small className="sub">Input all skills you have in the area of coding <b>seperated by commas</b></small>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="description" > description </label> <br />
                            <textarea required name="description" id="description" className="form-control" value={this.state.description} onChange={this.handleChange} maxlength='150'/>
                            <small className="sub">Provide a description to introduce yourself to all potential project partners!</small>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group" >
                            <label className="form-label" htmlFor="image" > Image URL </label>
                            <input className="form-control" type="text" name="image" id="image" value={this.state.image} onChange={this.handleChange} />
                            <small className="sub">Provide a link to the image you would like to use as your profile picture</small>
                        </div>
                    </div>
                    <button className="btn mt-3 btn-warning"> Submit </button>
                </div>
            </form>
        )
    }
}

export default UpdateUser;