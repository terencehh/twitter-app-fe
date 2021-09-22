import React, {Component} from 'react';
import styled from 'styled-components'

import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'

const SideBarLink = styled.div`
    display: flex;
    color: #e1e9fc;
    justify-content: space-space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: #252831;
        border-left: 4p solid #632ce4;
        cursor: pointer;
    }
`;

const SideBarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled.div`
    background: #414757;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;

    &:hover {
        background: #632ce4;
        cursor: pointer;
    }
`;

class SubMenu extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            twitterList: this.props.twitterList,
            listMembers: [],
            subNav: false
        }
    }

    showSubNav = () => this.setState({subNav: !this.state.subNav})

    componentDidMount() {
        this._isMounted = true;
        fetch(`http://localhost:3001/members/${this.state.twitterList.id_str}`, {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                listMembers: data
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onUserSelected(screen_name, id) {
        this.props.onUserSelected(screen_name, id);
    }
    
    render() {

        const { twitterList, listMembers, subNav } = this.state

        return (
            <>
            <SideBarLink onClick={this.showSubNav}>
                <div>
                    <AiIcons.AiFillHome />
                    <SideBarLabel>{twitterList.name}</SideBarLabel>
                </div>
                <div>
                    {subNav ? <RiIcons.RiArrowUpSFill />: <RiIcons.RiArrowDownSFill />}
                </div>
            </SideBarLink>
            {subNav && listMembers.users && listMembers.users.map((member, key) => {
                return (
                    <DropdownLink onClick={() => this.onUserSelected(member.name, member.id_str)}>
                        <SideBarLabel>{member.name}</SideBarLabel>
                    </DropdownLink>
                )
            })}
            </>
        )
    }
}

export default SubMenu;