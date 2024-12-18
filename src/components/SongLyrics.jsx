// CSS
import "../css/SongLyrics.css";

// Hooks
import { useState } from "react";

// Icons
import arrow from "../assets/icon-arrow-white.svg";

// IMG
import errImg from "../assets/img-error.webp";

const SongLyrics = ({ title, lyric, music, deezer }) => {

  const [showLyric, setShowLyric] = useState(false);

  if (!lyric || !music) return null;

  const { track } = music;

  const longAlbum = track.album ? track.album.image.length - 1 : null;

  let imageAlbum = "";

  if (longAlbum > 1) {
    imageAlbum = track.album.image[longAlbum]["#text"];
  }

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
    return imageAlbum.length ? `url(${imageAlbum})` : "none";
  }

  const styleBg = {
    position: "absolute",
    right: 0,
    width: "8rem",
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundImage: `
      linear-gradient(to right, #6c7086 0%, rgba(255, 255, 255, 0) 15%),
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
            <div className="song__data">
              <span className="song__data__texts">
                <span className="song__data__artist">{track.artist.name}</span>
                <span className="song__data__title">{title}</span>
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
                <div className="song__info__detail song__lyric">
                  <span className="song__info__detail__text">Letra</span>
                  <div className={`song__lyric__container ${showLyric ? "show__lyric" : ""}`}>
                    <p className="song__info__detail__lyric">{lyric.lyrics}</p>
                  </div>
                  <button className="song__lyric__button" onClick={() => setShowLyric(!showLyric)}>
                    <img className="arrow__icon" src={arrow} alt="Icono de flecha" />
                  </button>
                </div>
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
                            <a className="tag__link" href={tag.url}>{tag.name}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="song__extra__album">
                  <h4 className="song__extra__title">Destacado en</h4>
                  <div className="song__extra__album__container">
                    <a
                      className="song__extra__album__link"
                      href={track.album ? track.album.url : "#"}
                      target="_blank"
                      rel="noreferrer">
                      <figure className="song__extra__album__figure">
                        <img
                          className="song__extra__album__img"
                          src={imageAlbum}
                          onError={e => { e.target.onerror = null; e.target.src = errImg; }}
                          alt="Imagen del álbum"
                        />
                      </figure>
                      <div className="song__extra__album__content">
                        <div className="song__extra__album__texts">
                          <span className="song__extra__album__text">
                            {track.album? track.album.title : track.name}
                          </span>
                          <span className="song__extra__album__text">
                            {track.album? track.album.artist : track.artist.name}
                          </span>
                          {
                            track.listeners && <span className="song__extra__album__text">{formatNumber(track.listeners)} Oyentes</span>
                          }
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  )
};

export default SongLyrics;