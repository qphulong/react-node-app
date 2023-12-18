import "./post.scss"
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const Post = ({post}) => {

    //temp
    const liked = false;

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} atl = ""/>
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span>{post.name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>

                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt=""/>
                </div>

                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        12
                    </div>

                    <div className="item">
                        <CommentOutlinedIcon/>
                        12
                    </div>

                    <div className="item">
                        <ShareOutlinedIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post