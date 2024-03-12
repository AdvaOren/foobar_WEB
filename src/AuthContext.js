import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken, addUserServer, getUsersList } from './serverCalls/LogInSignUp.js';
import { getPostList } from './serverCalls/posts.js';


const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = useState({
        username: '',
        name: '',
        id: 0,
        profileImage: '',
        token: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [usersList, setUsersList] = useState([]);
    const [postsList, setPostsList] = useState([]);
    const [theme, setTheme] = useState("theme-light");

    // function to toggle between light and dark theme
    function toggleTheme() {
        if (theme == 'theme-dark') {
            setTheme('theme-light');
        } else {
            setTheme('theme-dark');

        }
    }


    const login = async (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        const newUsersList = await getUsersList(userData.id, userData.token); //Get friends list from DB
        let friendsListN = [];
        newUsersList.map((friend) => {
            friendsListN.push({
                id: friend._id,
                profileImage: "data:image/png;base64," + friend.img,
                name: friend.firstName + " " + friend.lastName,
                userName: friend.email,
                password: friend.password
            })
        })
        setUsersList(friendsListN);
        // const postsListNew = await getPostList(userData.token);
        // const formattedPosts = postsListNew ? await postsListNew.map(post => ({
        //     id: post.first._id,
        //     userId: post.second._id,
        //     likes: post.third.likeAmount,
        //     postUrl: "data:image/png;base64," + post.first.img,
        //     text: post.first.content,
        //     userName: post.second.email,
        //     name: post.second.firstName + " " + post.second.lastName,
        //     profileImage: "data:image/png;base64," + post.second.img,
        //     date: post.first.date
        // })) : [];
        // setPostsList(formattedPosts);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTheme('theme-light');
    };

    const setUserVar = (userDet) => {
        setUser(userDet);
    }

    const addUser = async (userData) => {
        const updatedUsersList = usersList ? [...usersList] : [];
        let newUser = {
            username: userData.username,
            name: userData.firstName + " " + userData.lastName,
            id: 0,
            profileImage: userData.img,
            token: 0,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName
        }
        try {
            const response = await addUserServer(userData);
            newUser.id = await response.data;
            if (response.statusText != "OK") {
                throw new Error('Network response was not ok');
            } else {
                const res = await getToken(newUser.id);
                const json = await res.json()
                newUser.token = json.token;
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Update the post list in the component's state
        setUsersList([...updatedUsersList, newUser]);
        return newUser
    }

    const setPostsListFun = (val) => {
        setPostsList(val);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, addUser, usersList, setPostsListFun, postsList, theme, toggleTheme, setUserVar }}>
            {children}
        </AuthContext.Provider>
    );

}

function PrivateRoute({ Component }) {
    const auth = useContext(AuthContext);

    return (auth.isLoggedIn ? <Component /> : <Navigate to="/" />);
}

// Add PropTypes validation for children prop
PrivateRoute.propTypes = {
    Component: PropTypes.any
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};


export { AuthProvider, PrivateRoute, AuthContext };

