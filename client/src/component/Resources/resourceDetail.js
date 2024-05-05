import { useLocation } from 'react-router-dom'
import Navigation from '../navbar/Navigation'
import { FaStar, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../contexts/themeContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useJwt } from 'react-jwt'
import Rating from './rating'

function ResourceDetail () {
  const location = useLocation()
  const [resource, setResource] = useState(location.state.resource)
  const { theme, setTheme } = useContext(ThemeContext)
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token)
  const [addComment, setAddComment] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [fileContent, setFileContent] = useState('');
  const [rating, setRating] = useState();

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

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(resource.title)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedin = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  // function getUpdatedResource(resourceID)
  // {
  //   axios.get(`http://localhost:3001/resource/${resourceID}`)
  //   .then((res, req)=>{
  //     setResource(res.data)
  //   })
  // }

  useEffect(() => {
    getAllPlaylists()
  }, [])
  useEffect(() => {
    // Fetch file content when component mounts
    if (resource.media === 'document') {
      axios.get(`http://localhost:3001/${resource.file_path}`, { responseType: 'blob' })
        .then((response) => {
          // Convert the blob to a base64 string
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = () => {
            setFileContent(reader.result);
          };
        })
        .catch((error) => {
          console.error('Error fetching file:', error);
        });
    }
  }, [resource]);


  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    const url = new URL(window.location.href);
    const resourceID = url.pathname.split('/')[2];
    await axios.post('http://localhost:3001/resource/addResourceRating', {
      userID:decodedToken.userId,
      resourceID:resourceID,
      rating:newRating
      
    })
    .then((res, req)=>{
      
        alert("Rating submitted successfully!")
        setResource(res.data)
    })
    .catch((er)=>{
      alert(er.response.data.message)
    })
    
    // getUpdatedResource(resourceID);

  };



  return (
    <>
      <Navigation />
      <ToastContainer />

      <section style={{ marginLeft: '16%' }}>
        <div className={appendThemeToClassNames('resourceDetails')}>
          <h1>{resource.title}
            <span className='socialMediaSign'>
              <FaFacebook className='fbSign' size={30} onClick={shareOnFacebook} />
              <FaTwitter className='twitterSign' size={30} onClick={shareOnTwitter} />
              <FaLinkedin className='linkedinSign' size={30} onClick={shareOnLinkedin} />
            </span>
          </h1>
          <p>{resource.description}</p>
          {resource.media === 'image' && (
            <img className='resourceDetailImage' src={`http://localhost:3001/${resource.file_path}`} alt="Resource" />
          )}
          {resource.media === 'document' && (
            <embed className='resourceDetailDoc' src={fileContent}  height="400" type="application/pdf" />
          )}
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
            <h1>Rating: {resource.rating_score}</h1>
            <div className={appendThemeToClassNames('ratingStars')}>
              {/* <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} />
              <FaStar size={25} /> */}
              <Rating rating={rating} onRatingChange={handleRatingChange} />
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
