import { useContext, useEffect, useState } from 'react'
import Navigation from '../navbar/Navigation'
import './index.css'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import ThemeContext from '../../contexts/themeContext'
import PlaylistModal from './playlistUploadModal'
import axios from 'axios'

function Playlists () {
  const { theme, setTheme } = useContext(ThemeContext)
  const [findPlaylist, setFindPlaylist] = useState('')

  const [playlists, setPlaylists] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const filteredPlaylists = playlists.filter(playlist => {
    const searchText = findPlaylist.toLowerCase()
    return (
      playlist.name.toLowerCase().includes(searchText) ||
      playlist.description.toLowerCase().includes(searchText)
    )
  })

  function getAllPlaylists () {
    axios.get('http://localhost:3001/playlist').then((res, req) => {
      setPlaylists(res.data)
    })
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleSubmitPlaylist = formData => {
    handleCloseModal()
  }

  useEffect(() => {
    getAllPlaylists()
  }, [])

  return (
    <>
      <Navigation />
      <section style={{ marginLeft: '16%' }}>
        <div className={`resourceSearch-${theme}`}>
          <input
            type='text'
            value={findPlaylist}
            placeholder='Search for Playlist'
            onChange={e => setFindPlaylist(e.target.value)}
          />
          <button
            onClick={handleOpenModal}
            className={`uploadResourceBtn-${theme}`}
          >
            New Playlist
          </button>
        </div>
        <PlaylistModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSubmit={handleSubmitPlaylist}
        />
        <div className={`cards-${theme}`}>
          {filteredPlaylists.map(playlist => (
            <div className='card' key={playlist._id}>
              <section className={`resourceTexts-${theme}`}>
                <h1>{playlist.name}</h1>
                <p>{playlist.description} </p>
              </section>
              <NavLink
                to={`/playlists/${playlist.id}`}
                state={{ playlist: playlist }}
              >
                <button className='viewBtn'>View Playlist</button>
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Playlists
