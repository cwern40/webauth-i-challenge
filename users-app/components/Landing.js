import React, { Component} from 'react';
import axios from 'axios';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                this.setState({ users: res.payload})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        <div>
            <h3>List of Users</h3>
            {this.state.users.map(user => {
                <p>{user}</p>
            })}
        </div>
    }
}

export default Landing;