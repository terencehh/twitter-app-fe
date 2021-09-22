import './App.css';
import Sidebar from './components/Sidebar';
import React, {Component} from 'react';
import MaterialTable from 'material-table';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedUserName: '',
      selecterUserId: '',
      followerData: []
    }
    this.onUserSelected = this.onUserSelected.bind(this);
  }

  onUserSelected(screen_name, id) {
    this.setState({
      selectedUserName: screen_name,
      selecterUserId: id
    })
    this.getRecentFollowers(id)
  }

  getRecentFollowers(twitterId) {
    fetch(`https://twitter-app-back-end.herokuapp.com/follower-recent-follows/${twitterId}`, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        followerData: data.users
      })
    })
    .catch(console.log)
  }

  render() {

    const { selectedUserName, selecterUserId, followerData } = this.state;

    return (
      <div>
        <Sidebar onUserSelected={this.onUserSelected}/>
        <div className="table-container">
          <MaterialTable
            style={{zIndex: -1}}
            title={selectedUserName ? `${selectedUserName}'s Recent Follows` : 'Please Select a User'} 
            columns={[
              { title: 'Twitter Handle', field: 'screen_name' },
              { title: 'Created Date', field: 'created_at' },
              { title: 'Follower Count', field: 'followers_count' },
            ]}
            data={followerData.length > 0 ? 
              followerData.map(data => { 
                return {
                screen_name: data.screen_name,
                created_at: data.created_at,
                followers_count: data.followers_count
              }
            }) : []}
            options={{
              search: false,
              paging: false,
              sorting: false,
              pointerEvents: "none",
              draggable: false
            }}
          />
        </div>
      </div>
    )
  };
}

export default App;