function DeletePostBtn({postList, setPostList, id}) {
    const deletePost = () => {
        let list = postList;
        let index = 0;
        list.forEach((post) => {
            if (post.id === id) {
                index = list.indexOf(post);
            }
        })
        for (let i = index; i < list.length - 1; i++) {
            let temp = list[i];
            list[i] = list[i + 1];
            list[i + 1] = temp;
        }
        const newList = list.filter((oldPost) => oldPost.id !== id);
        setPostList(postList => list);
        setPostList(list => newList);
        //postList.forceUpdate(setPostList);
    }
    return (
        <div className="dropdown-item">
            <button className="dropdown-item" onClick={deletePost}>delete post
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16" fill="currentColor"
                     className="bi bi-x-circle"
                     viewBox="0 0 16 16">
                    <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        </div>

    )
}

export default DeletePostBtn