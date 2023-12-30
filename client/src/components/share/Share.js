import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './share.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
const Share = () => {

    const {currentUser} = useContext(AuthContext)
    const [file, setFile] = useState(null);


    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <p>Home</p>
                    <AutoAwesomeIcon style={{ fontSize: 20 }}/>
                </div>

                <div className="middle">
                    <img src={currentUser.profilePic} alt=''/>
                    <input 
                        type='text' 
                        placeholder='What is happening'/>
                    <button>Tweet</button>
                </div>

                <div className="bottom">
                    <input 
                        type='file'
                        style={{display: 'none'}}
                        id='file'
                        accept='.png,.jpeg,.jpg'
                        onChange={(e) => setFile(e.target.files[0])}/>
                    <label htmlFor='file'>
                        <div className='item'>
                            <AddPhotoAlternateIcon style={{ fontSize: 25 }}/>
                            <span>Add image</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Share