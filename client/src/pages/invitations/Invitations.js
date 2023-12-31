import './invitations.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Button from '@mui/material/Button';

const Invitations = () => {
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