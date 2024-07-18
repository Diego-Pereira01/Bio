import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faSteam, faXbox } from '@fortawesome/free-brands-svg-icons';
import { fetchDiscordProfile } from '../../services/discordService';
import './Card.css';

interface DiscordProfile {
  global_name: string;
  id: string;
  avatar: string;
  banner?: string;
  username: string;
  discriminator: string;
}

const Card: React.FC = () => {
  const [profile, setProfile] = useState<DiscordProfile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchDiscordProfile();

        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const getAvatarUrl = (id: string, avatar: string): string => {
    const isGif = avatar.startsWith('a_');
    const extension = isGif ? 'gif' : avatar.endsWith('.png') ? 'png' : 'jpg';
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${extension}?size=1024`;
  };
  
  const getBannerUrl = (id: string, banner: string | undefined): string => {
    if (!banner) return '';
    const isGif = banner.startsWith('a_');
    const extension = isGif ? 'gif' : banner.endsWith('.png') ? 'png' : 'jpg';
    return `https://cdn.discordapp.com/banners/${id}/${banner}.${extension}?size=1024`;
  };
  
  return (
    <div className="card">
      <div className="card-header">
        {profile.banner && (
          <img src={getBannerUrl(profile.id, profile.banner)} alt="Background" className="background-image" />
        )}
        <img src={getAvatarUrl(profile.id, profile.avatar)} alt="Profile" className="profile-image" />
      </div>
      <div className="card-body">
        <h2>{`${profile.global_name}`}</h2>
        <div className="mini-cards-container">
          <div className="mini-card">
            <a className="discord" href={`https://www.discordapp.com/users/${profile.id}`}>
              <FontAwesomeIcon icon={faDiscord} size="2x" className="icon" />
            </a>
            <a className="instagram" href='https://www.instagram.com/near._01/'>
              <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
            </a>
            <a className="steam" href='https://steamcommunity.com/profiles/76561199309706023'>
              <FontAwesomeIcon icon={faSteam} size="2x" className="icon" />
            </a>
            <a className="xbox" href='https://www.xbox.com/pt-BR/play/user/Tommy%20Shelby173'>
              <FontAwesomeIcon icon={faXbox} size="2x" className="icon" />
            </a>
          </div>
        </div>
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/playlist/5l4yEvLEQIgCSd0Ki3WmZ5?utm_source=generator&theme=0"
          width="100%"
          height="100"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Card;
