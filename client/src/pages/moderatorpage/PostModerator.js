import './postModerator.scss';
import { useEffect, useState, useRef, useContext } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const PostModerator = ({postIdModerator}) => {
    
    // const [images, setImages] = useState(['https://pbs.twimg.com/media/GCfJUsAaEAATOon?format=jpg&name=4096x4096', 
    // 'https://pbs.twimg.com/media/GCfJLAEaMAAXvmP?format=jpg&name=4096x4096', 
    // 'https://pbs.twimg.com/media/GCfHyvCaUAAODgW?format=jpg&name=4096x4096']);
    const [images, setImages] = useState([])
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent((prevCurrent) => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
    };
    
    const prevSlide = () => {
        setCurrent((prevCurrent) => (prevCurrent === 0 ? length - 1 : prevCurrent - 1));
    };

    //=================================================================================================
    //retrieve images from API
    const getImages = async (postId) => {
        const response = await fetch(
         `http://localhost:3001/posts/images/${postId}`
        );
        const data = await response.json();
        console.log(data);
        setImages(data.images);

        for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];
        data.images[i] = `http://localhost:3001/${image}`;
        }
    };

    useEffect(() => {
        getImages(postIdModerator);
    }, []);
    //=================================================================================================
    //=================================================================================================
    // Handle Click Keep or Remove

    
    //=================================================================================================
    //=================================================================================================

    return (
        <div className='post-moderator'>
            <div className='top-part'>
                <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' className='profile-picture' />
                <div className='post-info'>
                    <span className='user-name'>Hong Nhut</span>
                    <span className='time'>1 min ago</span>
                </div>
            </div>
            <div className='middle-part'>
                <div className='content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                </div>
                {images &&
                    <section className='slider'>
                        {images.map((image, index) => {
                            return (
                                <div
                                    className={index === current ? 'slide active' : 'slide'}
                                    key={index}
                                >
                                    <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
                                    <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
                                    {index === current && (
                                        <img src={image} alt='travel image' className='image' />
                                    )}
                                </div>
                            );
                        })}
                    </section>}

            </div>
            <div className='bottom-part'>
                <button className='accept-btn' onClick={handleKeep}>Keep</button>
                <button className='reject-btn' onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

export default PostModerator