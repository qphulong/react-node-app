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
    const [newPost, setNewPost] = useState(null);
    console.log('====================================');
    console.log(newPost);
    console.log('====================================');
    //upload
    const upload = async () => {
        try{
            const formData = new FormData()
            formData.append("file",file)
            const response = await axios.post(`http://localhost:3001/storage/upload/${newPost.post}`)
            return response.data
        }
        catch(err){
            console.log(err);
        }
    }

    const queryClient = useQueryClient()

    // Mutations
  const mutation = useMutation({
    mutationFn: (newPost) => {
        return axios.post("http://localhost:3001/posts",{
            content: desc,
            userId: currentUser.userId
        })
    },
    onSuccess: (response) => {
        // Access the newly created post object here
        setNewPost(response.data);
        // const newPostObject = response.data;
        // console.log("Newly added post:", newPostObject);
         // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

    const handleClick = async (e) => {
        e.preventDefault()
        
        mutation.mutate({desc})
        // print
        // console.log(newPostId);
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
                    onChange = {(e) => setDesc(e.target.value)}
                    />
                </div>

                <hr/>
                <div className='bottom'>
                    <div className='left'>
                        <input 
                            type='file' 
                            id='file' 
                            onChange = {(e) => setFile(e.target.files[0])}
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