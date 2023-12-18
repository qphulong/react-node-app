import Post from '../post/Post'
import './posts.scss'

const Posts = () => {

    //temporary
    const posts = [
        {
            id: 1,
            name: 'Jone Doe',
            userId: 1,
            profilePic: "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desc: "HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD ",
            img: "https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: 'Jone Doe',
            userId: 1,
            profilePic: "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desc: " Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  Tran Minh Khanh  ",
        },

    ]

    return (
        <div className="posts">
            {posts.map((post) => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    )
}

export default Posts