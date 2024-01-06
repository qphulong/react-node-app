import './invitations.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Invitations = () => {

    const { currentUser} = useContext(AuthContext);

    // const data = "add-friends/tmk3010-e5eaee39-819d-45b8-991f-de9a997fb4b4"
    // const extractedValue = data.split('/')[1].split('-')[0]; // "tmk3010"

    // console.log(extractedValue);

    const {friendLink} = useParams()


    return (
        <div className='invitations'>
            <div className='title'>
                <span>OnlyMe</span>
            </div>
            <div className='container'>
                <div className='content-container'>
                    <p>You are added by Jony Doe</p>
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