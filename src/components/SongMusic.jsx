// CSS
import "../css/SongMusic.css";

// COMPONENTS
import Message from "./Message";

// Hooks
import { useState, useEffect, useRef } from "react";

// Assets
import arrow from "../assets/icon-arrow-white.svg";

// IMG
import errImg from "../assets/img-error.webp";

const SongMusic = ({ lyric, music, deezer }) => {

  const [showLyric, setShowLyric] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log("Mostrando detalles")
    // console.log("Detalles del track: ", music);
    // console.log("Detalles de la letra: ", lyric);
    // console.log("Detalles de Deezer: ", deezer);
  }, []);
  
  const handleAudio = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };
  
  if (!lyric || !music) return null;
  const { track } = music;
  let imageAlbum = deezer.album.cover_medium;

  const formatNumber = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    } else {
      return num;
    }
  }

  const formatMilliseconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const formatSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const segundos = ((seconds % 60)).toFixed(0);
    return `${minutes}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  const getBgImage = imageAlbum => {
    return imageAlbum ? `url(${imageAlbum})` : `url(${"../assets/img-error.webp"})`;
  }

  const styleBg = {
    position: "absolute",
    right: 0,
    width: "8rem",
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundImage: `
      linear-gradient(to right, #1e1e2e 0%, rgba(255, 255, 255, 0) 5%),
      ${getBgImage(imageAlbum)}`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center right",
  }

  return (
    <section className="song__lyrics__section">
      <div className="song__header">
        <div className="song__header__container">
          <article className="song__header__content">
            <div className="song__bg" style={styleBg}></div>
            <div className="song__bg--color"></div>
            <div className="song__data container">
              <span className="song__data__texts">
                <span className="song__data__artist">{track.artist.name}</span>
                <span className="song__data__title">{music.track.name}</span>
              </span>
            </div>
          </article>
        </div>
      </div>
      <div className="song__info container">
        <div className="song__info__container">
          <article className="song__info__content">
            <section className="song__listeners__details">
              <div className="song__listeners__container">
                <span className="song__listeners__text">Oyentes</span>
                <span className="song__listeners__number">{formatNumber(track.listeners)}</span>
              </div>
              <div className="song__listeners">
                <span className="song__listeners__text">Reproducido</span>
                <span className="song__listeners__number">{formatNumber(track.playcount)}</span>
              </div>
            </section>
            <section className="song__info__details">
              <div className="song__lyrics__container">
                {
                  track.duration && (
                    <div className="song__info__detail song__duration">
                      <span className="song__info__detail__text">Duración</span>
                      <span className="song__info__detail__number">
                        {formatSeconds(deezer.duration)}
                      </span>
                    </div>
                  )
                }
                {
                  lyric.lyrics
                  ? (
                    <div className="song__info__detail song__lyric">
                      <span className="song__info__detail__text">Letra</span>
                      <div className={`song__lyric__container ${showLyric ? "show__lyric" : ""}`}>
                        <p className="song__info__detail__lyric">{lyric.lyrics}</p>
                      </div>
                      <button className="song__lyric__button" onClick={() => setShowLyric(!showLyric)}>
                        <img className="arrow__icon" src={arrow} alt="Icono de flecha" />
                      </button>
                    </div>
                  )
                  : (<Message text={`No se encontró letra para la canción`} />)
                }
              </div>
            </section>
            <section className="song__extra__details">
              <div className="song__extra__container">
                {track.wiki && (
                  <div className="song__extra__info">
                    <p dangerouslySetInnerHTML={{ __html: track.wiki.summary }} />
                  </div>
                )}
                <div className="song__extra__tags">
                  <div className="song__extra__tags__container">
                    <ul className="song__extra__tags__list">
                      {
                        track.toptags.tag.map((tag, index) =>(
                          <li key={index} className="song__extra__tags__item">
                            <a className="tag__link" href={tag.url} rel="noreferrer" target="_blank">{tag.name}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="song__extra__album">
                  <h4 className="song__extra__title">Destacado en</h4>
                  <div className="song__extra__album__container">
                    <article className="song__audio__photo">
                      <figure className="song__extra__album__figure">
                        <img
                          className="song__extra__album__img"
                          src={deezer.album.cover_medium}
                          onError={e => { e.target.onerror = null; e.target.src = errImg; }}
                          alt="Imagen del álbum"
                        />
                        <div className="flex-c-c play__song" onClick={handleAudio}>
                          {
                            isPlaying ? (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="icon__pause">
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path
                                  d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
                                />
                                <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="icon__play">
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                              </svg>
                            )
                          }
                          
                        </div>
                      </figure>
                      <a className="song__extra__album__content" href={track.url ? track.url : "#"} target="_blank" rel="noreferrer">
                        <div className="song__extra__album__text">
                          <div className="song__extra__album__texts">
                            <span className="song__extra__album__text">
                              {track.album? track.album.title : track.name}
                            </span>
                            <span className="song__extra__album__text">
                              {track.album? track.album.artist : track.artist.name}
                            </span>
                            {
                              track.listeners && <span className="song__extra__album__text">{formatNumber(track.listeners)} Oyente(s)</span>
                            }
                          </div>
                        </div>
                      </a>
                    </article>
                  </div>
                </div>
              </div>
            </section>
            <section className="song__audio">
              <div className="song__audio__container">
                <audio
                  ref={audioRef}
                  src={deezer.preview}
                  onEnded={handleEnded}
                  className="song__audio__player"
                ></audio>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
};

export default SongMusic;