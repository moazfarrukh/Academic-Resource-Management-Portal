import { useLocation } from 'react-router-dom'
import Navigation from '../navbar/Navigation'
import { FaStar } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../contexts/themeContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useJwt } from 'react-jwt'

function ResourceDetail () {
  const location = useLocation()
  const [resource, setResource] = useState(location.state.resource)
  const { theme, setTheme } = useContext(ThemeContext)
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token)
  const [addComment, setAddComment] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Function to append theme to class names
  const appendThemeToClassNames = classNames => {
    return `${classNames}-${theme}`
  }

  const handlePostComment = async () => {
    await axios
      .post('http://localhost:3001/resource/addComment', {
        id: resource._id,
        commentTitle: addComment,
        author: decodedToken.firstName
      })
      .then((res, req) => {
        setResource(res.data)
      })
  }
  function getAllPlaylists () {
    axios.get('http://localhost:3001/playlist').then((res, req) => {
      setPlaylists(res.data)
    })
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const addToPlaylist = async playlistId => {
    await axios
      .post('http://localhost:3001/playlist/add/resource', {
        playlistId: playlistId,
        ResourceId: resource._id
      })
      .then(() => {
        toast.success('Resource added to playlist')
        toggleDropdown()
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllPlaylists()
  }, [])

  return (
    <>
      <Navigation />
      <ToastContainer />

      <section style={{ marginLeft: '16%' }}>
        <div className={appendThemeToClassNames('resourceDetails')}>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
          <p>Resource will show here...</p>
        </div>
        <hr className={appendThemeToClassNames('resourceDetailLine')}></hr>
     <div className="select-container" style={{ float: 'right', marginRight: '30px' }}>
  <select onChange={(e) => addToPlaylist(e.target.value)}>
  
    <option value="">Add to Playlist</option>
    {playlists.map(playlist => (
      <option key={playlist._id} value={playlist._id}>
        {playlist.name}
      </option>
    ))}
  </select>

</div>


        <div className={appendThemeToClassNames('resourceFooter')}>
          <div className={appendThemeToClassNames('resourceRatting')}>
            <h1>Rating: 4.4</h1>
            <div className={appendThemeToClassNames('ratingStars')}>
              <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} />
            </div>
          </div>
          <div className={appendThemeToClassNames('resourceComments')}>
            <h1>Comments:</h1>
                        <div className="comments">
                            {
                                resource.comments.map(comment=>{
                                    return(
                                        <div key={comment._id}>
                                            <h1>{comment.authorName}</h1>
                                            <p>{comment.text}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
          </div>
          <div className={appendThemeToClassNames('resourceAddComment')}>
            <textarea
              value={addComment}
              placeholder='Add your comment here!'
              rows='4'
              onChange={e => {
                setAddComment(e.target.value)
              }}
            ></textarea>
            <br></br>
            <button
              onClick={handlePostComment}
              className={appendThemeToClassNames('addCommentBtn')}
            >
              Post Comment
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResourceDetail
