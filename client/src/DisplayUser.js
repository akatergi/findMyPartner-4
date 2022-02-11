import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./DisplayUser.css"

function DisplayUser(props) {
    const { id } = useParams()
    return <DisplayUserM id={id}/>
}

class DisplayUserM extends Component {
    state = {
        user: {}
    }

    componentDidMount = () => {
        axios.get(`/userdata/${this.props.id}`, this.state).then(res => {console.log(res, this.props.id); return res.data}).then(e => this.setState({ user: e }))
    }

    render() {
        let user = this.state.user
        if (user.username === "") {
            return <h1 className="display-3 py-4 text-danger bg-warning text-center"><b>Invalid user</b></h1>
        }
        return (
            <div className='container dContainer'>
                <div className="row">
                    <div className="col-6">
                        <h3 className='text-center dTitle'> {user.username} </h3>
                        <p className="text-center" style={{fontSize:"1.3em"}}> {user.email} </p>
                        <img className="dImage" width="100px" src={user.image} alt="profilepicture" />
                    </div>
                    <div className="col-6">
                        <h4 className='dh4'>Description:</h4>
                        <p className='dp'> {user.description} </p>
                        <h4 className='dh4'> Programming Languages: </h4>
                        <ul className='dp'> {user.languages ? user.languages.map(lang => < li key={lang} > {lang.charAt(0).toUpperCase() + lang.slice(1)} </li>) : ""} </ul>
                        <h4 className='dh4' > Skills: </h4>
                        <ul className='dp'> {user.skills ? user.skills.map(lang => < li key={lang} > {lang.charAt(0).toUpperCase() + lang.slice(1)} </li>) : ""} </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayUser