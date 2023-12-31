import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './share.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
import {useMutation, QueryClient, useQueryClient} from "@tanstack/react-query"
import axios from 'axios';
const Share = () => {

    const {currentUser} = useContext(AuthContext)
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("")

    const queryClient = useQueryClient()

    // Mutations
  const mutation = useMutation({
    mutationFn: (newPost) => {
        return axios.post("http://localhost:3001/posts",{
            content: desc,
            userId: currentUser.userId
        })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

    const handleClick = (e) => {
        e.preventDefault()
        mutation.mutate({desc})
    }

    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <img 
                        src='https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        alt=''
                    />
                    <input 
                    type="text" 
                    placeholder={`What's on your mind ${currentUser.name}?`}
                    onchange = {(e) => setDesc(e.target.value)}
                    />
                </div>

                <hr/>
                <div className='bottom'>
                    <div className='left'>
                        <input 
                            type='file' 
                            id='file' 
                            onchange = {(e) => setFile(e.target.files[0])}
                            style={{display: "none"}}/>
                        <label htmlFor="file">
                        <div className="item">
                            <AddPhotoAlternateIcon style={{ fontSize: 25 }}/>
                            <span>Add Image</span>
                        </div>
                        </label>
                    </div>
                    <div className='right'>
                        <button onClick={handleClick}>Tweet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share