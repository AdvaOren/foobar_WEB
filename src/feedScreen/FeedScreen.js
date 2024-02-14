import './FeedScreen.css';
import PostWithImg from "../post/PostWithImg";
import LeftMenu from "../left-menu/LeftMenu";
import RightMenu from "../rightMenu/RightMenu";
import NavBar from "../NavBar/NavBar";
import posts from "../posts.js"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';


function FeedScreen() {
    const location = useLocation();
    const navigate = useNavigate()

    const firstN = location?.state?.firstN
    const lastN = location?.state?.LastN;
    const userImg = location?.state?.userImg
    const theme = location?.state?.theme
    const didLogin = location?.state?.didLogin
    useEffect(() => {
        if (didLogin === undefined) {
            navigate("/");
        }
    });

    const [postList, setPostList] = useState(posts)
    return (
        <div id={"app"} className="App">
            <NavBar theme={theme}></NavBar>
            <div id={"body"} className="container text-center bg-body-tertiary">
                <div className="row">
                    <LeftMenu firstN={firstN} LastN={lastN}
                              img={userImg}></LeftMenu>
                    <div className="col-6">
                        {
                            postList.map((post) => <PostWithImg {...post}
                                                                currentUsername={firstN + " " + lastN}
                                                                currentUserImg={userImg}
                                                                postList={postList}
                                                                setPostList={setPostList}
                                                                key={post.id}/>)
                        }
                    </div>
                    <RightMenu postList={postList} setPostList={setPostList}
                               username={firstN + lastN}
                               userImg={userImg}></RightMenu>
                </div>
            </div>
        </div>
    );
}

export default FeedScreen;