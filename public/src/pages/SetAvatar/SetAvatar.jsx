import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SetAvatar.css';
import Loader from '../../assets/loader.gif';
import { Buffer } from 'buffer';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const setProfilePicture = async () => {
    const userString = localStorage.getItem('userId');
    if (!userString) {
      toast.error('User not logged in', toastOptions);
      return;
    }
console.log("userId",userString)
    

    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      try {
        console.log(selectedAvatar)
        const response = await fetch(`http://localhost:4000/chatbox/setAvatar/${userString}`, {
          method: 'POST',
        
          body: JSON.stringify({ image: avatars[selectedAvatar] }),
        });

        const result = await response.json();

       
      } catch (error) {
        toast.error('An error occurred', toastOptions);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
          const image = await response.text();
          const base64Image = Buffer.from(image).toString('base64');
          data.push(base64Image);
        }
        if (isMounted) {
          setAvatars(data);
          localStorage.setItem('avatars', JSON.stringify(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching avatars:', error);
        if (isMounted) {
          setIsLoading(false);
          toast.error('Failed to load avatars', toastOptions);
        }
      }
    };

    localStorage.removeItem('avatars');
    fetchAvatars();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <img src={Loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="container">
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default SetAvatar;
