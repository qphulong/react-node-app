import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import "./forModerator.scss";
import PostModerator from "./PostModerator.js"; // Correct path assuming both files are in the same folder
import { AuthContext } from "../../context/authContext.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const ForModerator = () => {
    const [isModerator, setIsModerator] = useState(false);
    const { currentUser } = useContext(AuthContext);

    //======================================================================================================
    //Check moderator
    const CheckIsModerator = async () => {
        try {
            const response = await axios.get(
                window.backendURL + `/user/${currentUser.userId}/moderator`
            );

            if (response.status === 200) {
                console.log("====================================");
                console.log("Is moderator");
                console.log("====================================");
                setIsModerator(response.data.isModerator);
            } else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        CheckIsModerator();
    }, []);

    //======================================================================================================
    //Get all reported posts
    const {
        isLoading,
        error,
        data: ModeratorPosts,
    } = useQuery({
        queryKey: ["ModeratorPosts"],
        queryFn: async () => {
            try {
                return await axios
                    .get(window.backendURL + `/user/moderator`)
                    .then((response) => {
                        return response.data;
                    });
            } catch (error) {
                throw error;
            }
        },
    });

    if (isLoading) {
        return(<div className="loading-screen">
            <h3>Loading...</h3>;
        </div>)
        
        
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }

    // console.log('====================================');
    // console.log(ModeratorPosts.posts);
    // console.log('====================================');

    //======================================================================================================
    //======================================================================================================

    if (isModerator === false) {
        return (<div className="not-moderator-page">
            <div className="notification">
                You cannot be here.<br></br> You are not a moderator.{" "}
                <br></br>
                Please go back to your previous page.
            </div>
            <div className="back-container">
                <Link to={"/"}>
                    <LogoutIcon style={{ fontSize: 60, color: "white" }} />
                </Link>
            </div>
        </div>);
    }

    return (
        <div className="moderator-page">
            <div className="list-post">
                {isLoading
                    ? "Loading..."
                    : ModeratorPosts?.posts.map((post, index) => {
                        return <PostModerator postIdModerator={post} key={post} />;
                    })}
            </div>
        </div>
    );
};

export default ForModerator;
