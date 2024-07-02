/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import "./Menu.css"
import Friends from '../../Friends/Friends.js';
import { ReactComponent as FriendIcon } from '../../Images/Feed/user-friends.svg';
import { ReactComponent as Memories } from '../../Images/Feed/clock.svg';
import { ReactComponent as Saved } from '../../Images/Feed/saved.svg';
import { ReactComponent as Groups } from '../../Images/Feed/group.svg';
import { ReactComponent as Video } from '../../Images/Feed/video-icon.svg';
import { ReactComponent as MarketPlace } from '../../Images/Feed/market.svg';
import { ReactComponent as Feeds } from '../../Images/Feed/feed.svg';
import { ReactComponent as Events } from '../../Images/Feed/calendar.svg';
import { AuthContext } from '../../AuthContext.js';
import { useNavigate } from 'react-router';

function Menu() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [friendsClicked, setFriendsClicked] = useState(false);
    const menuDetails = [
        {
            text: "Friends",
            url: FriendIcon,
            onClickFun: ()=>setFriendsClicked(true)
        },
        {
            text: "Memories",
            url: Memories
        },
        {
            text: "Saved",
            url: Saved
        },
        {
            text: "Groups",
            url: Groups
        },
        {
            text: "Video",
            url: Video
        },
        {
            text: "MarketPlace",
            url: MarketPlace
        },
        {
            text: "Feeds",
            url: Feeds
        },
        {
            text: "Events",
            url: Events
        },
    ];
    const userDet = {
        userId: user.id,
        profilePic: user.profileImage,
        name: user.name
    };
    return (
        <div id="MenuContent">
            {friendsClicked && <Friends setFriendsClicked={setFriendsClicked} />}
            <div className="patternContent" key={user.id} onClick={() => navigate("/profilePage", { state: userDet })}>
                <img alt='profileImg' id="profileImage" src={user.profileImage} />
                <p className='menuText' style={{ fontWeight: 'bold' }}>{user.name}</p>
            </div>
            {
                menuDetails.map((detail, index) => {
                    return (
                        <div onClick={detail.onClickFun ? detail.onClickFun : () => {}} className="patternContent" key={index}>
                            <detail.url className='detailsIcon' />
                            <p className='menuText'>{detail.text}</p>
                        </div>
                    )
                }

                )
            }
        </div >

    )

}

export default Menu;