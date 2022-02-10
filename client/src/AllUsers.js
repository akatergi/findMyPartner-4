import React, { Component} from 'react';
import "./AllUsers.css"

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

    makeCard = u => {
        var img = <img style={{width:"100%"}} src={u.image} />
        return (
            <div className="card userCard mt-4" >
                <a href={`/users/${u._id}`} >
                    <div className="card-header cardTitle text-center" > <span id="Ausername" > {u.username} </span> </div >
                    {img}
                    <ul className="list-group list-group-flush" >
                        <div className="card-body" >
                            <span id="Adescription" > {u.description} </span>
                        </div>
                    </ul>
                </a>
            </div >
        )
    }

    render() {
        let userList = this.state.users.map(u => <div className="col-3" key={u.username}> {this.makeCard(u)} </div>)
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