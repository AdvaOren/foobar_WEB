import './App.css';
import PostWithImg from "../post/PostWithImg";
import LeftMenu from "../left-menu/LeftMenu";
import RightMenu from "../rightMenu/RightMenu";
import NavBar from "../NavBar/NavBar";
import posts from "../posts.js"
import {useState} from "react";
import ten from '../10.jpg'

function App() {
    const [postList, setPostList] = useState(posts)
    const username = "username"
    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="container text-center bg-body-tertiary">
                <div className="row">
                    <LeftMenu username={username}></LeftMenu>
                    <div className="col">
                        {
                            postList.map((post) => <PostWithImg {...post} postList={postList} setPostList={setPostList} userImg={ten}/>)
                        }
                    </div>
                    <RightMenu postList={postList} setPostList={setPostList}
                               username={username}></RightMenu>
                </div>
            </div>
        </div>
    );
}

export default App;
