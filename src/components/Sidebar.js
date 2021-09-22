import React, {Component} from 'react';
import styled from 'styled-components';
import SubMenu from './SubMenu';

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled.div`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    overflow : auto;
`;

const SidebarWrap = styled.nav`
    width: 100%;
`;

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            sidebar: false
        }
        this.onUserSelected = this.onUserSelected.bind(this);
    }
    
    showSidebar = () => this.setState({sidebar: !this.state.sidebar})
    
    componentDidMount() {
        fetch(`http://localhost:3001/collections/tereykiller`, {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((data) => data.json())
        .then((data) => {
          this.setState({lists: data});
        }) 
        .catch(console.log)
    }

    onUserSelected(screen_name, id) {
        this.props.onUserSelected(screen_name, id)
    }

    render() {

        const { lists } = this.state;

        return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon>
                    <FaIcons.FaBars style={{cursor: 'pointer'}} onClick={this.showSidebar} />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={this.state.sidebar}>
                <SidebarWrap>
                <NavIcon>
                    <AiIcons.AiOutlineClose style={{cursor: 'pointer'}} onClick={this.showSidebar} />
                </NavIcon>
                {lists.map((twitterList, key) => {
                return <SubMenu twitterList={twitterList} key={key} onUserSelected={this.onUserSelected}/>
                })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
        </>
        )
    }
}

export default Sidebar;
