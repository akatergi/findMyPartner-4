import React, { Component } from 'react';

class UserCard extends Component {
    render() {
        let u = this.props.u
        var img = <img style={{width:"100%"}} src={u.image} />
        return (
            <div className="card userCard mt-4" >
                <a className="userCardA" href={`/users/${u._id}`} >
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
}

export default UserCard