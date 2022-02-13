import React, { Component} from 'react';
import "./AllUsers.css"
import UserCard from './UserCard';

class AllUsers extends Component {
    state = {
        users: [],
    }
    getUserData = () => {
        fetch("/userdata", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        }).then(res => res.json()).then(e => this.setState({ users: e })).catch(e=> console.log(e))
    }

    componentDidMount = () => {
        this.getUserData()
    }

    render() {
        let userList = this.state.users.map(u => <div className="col-3" key={u.username}> <UserCard u={u} /> </div>)
        return (<div>
            <div className="container">
                <div className="row">
                    <h1 className="text-center display-3 mt-3"> All Users </h1>
                    {userList}
                </div>
            </div>
        </div>
        )
    }
}

export default AllUsers