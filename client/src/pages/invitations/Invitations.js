import './invitations.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const Invitations = () => {

    const { currentUser} = useContext(AuthContext);
    const [isFriendOrNot,setIsFriendOrNot] = useState(false)

    // const data = "add-friends/tmk3010-e5eaee39-819d-45b8-991f-de9a997fb4b4"
    // const extractedValue = data.split('/')[1].split('-')[0]; // "tmk3010"

    const {link} = useParams()
    const userId = link.split('-')[0];

    // console.log('====================================');
    // console.log(link);
    // console.log(userId);
    // console.log('====================================');

    const checkIsFriend = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/friends/check/${currentUser.userId}/${userId}`);
        
            if (response.status === 200) {
                // console.log('====================================');
                // console.log("Is friend: ",response.data.isFriend);
                // console.log('====================================');
                setIsFriendOrNot(response.data.isFriend)
            } 
            else {
                console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        checkIsFriend()
    },[])

     // if(userId === currentUser.userId){
    //     return (
    //         <div>
    //             You are currentuser so you can't access this link
    //         </div>
    //     )
    // }

    // useEffect(() => {
    //     console.log('====================================');
    //     console.log(isFriendOrNot);
    //     console.log('====================================');
    // },[isFriendOrNot])

    // if(isFriendOrNot === true){
    //     return (
    //         <div>
    //             You are already friend with {userId}
    //         </div>
    //     )
    // }


    return (
        <div className='invitations'>
            <div className='title'>
                <span>OnlyMe</span>
            </div>
            <div className='container'>
                <div className='content-container'>
                    <p>You are added by {userId}</p>
                    <div className='input-container'>
                        <span>Pass: </span>
                        <input type='text'/>
                    </div>
                    <div className='confirm-container'>
                        <Button variant="outlined" endIcon={<PersonAddAlt1Icon/>}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Invitations