// CSS
import "../css/SongArtist.css";

// Hooks
import { useState } from "react";

// Assets
import arrow from "../assets/icon-arrow-white.svg";

const SongArtist = ({ artist, deezer, music }) => {

  const { track } = music;

  const [showInfo, setShowInfo] = useState(false);

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

  return (
    <section className="song__artist__section container">
      <h4 className="song__artist__title">Acerca del artista</h4>
      <article className="song__artist__container">
        {/* aquí irían las imágenes */}
        <div className="song__artist__photos">
          <article className="artist__bio__container">
            <div className="artist__bg" style={{"--bg-img": `url(${deezer.artist.picture_medium})`, "--bg-img-xl": `url(${deezer.artist.picture_xl})`}}>
              <div className="artist__text__container">
                <div className="artist__text">
                  <div className="artist__text__header">
                    <h2 className="artist__name">{deezer.artist.name}</h2>
                    <span className="artist__listeners">{track.listeners ? formatNumber(track.listeners) : "0"} oyentes</span>
                  </div>
                  <div className="artist__text__bio">
                    <div className="artist__text__bio__content">
                      <p className="artist__bio__text" dangerouslySetInnerHTML={{ __html: artist.bio.summary }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="song__artist__about">
          <div className="artist__tags">
            <ul className="song__artist__tags__list">
              {
                artist.tags.tag.map((tag, index) => (
                  <li key={index} className="song__artist__tags__item">
                    <a className="tag__link" href={tag.url}>{tag.name}</a>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="song__artist__more">
            <p className="song__artist__bio__profile">
              <a className="song__link" href={artist.bio.links.link.href} target="_blank" rel="noreferrer">Perfil del artista</a>
            </p>
            <p className="song__artist__bio__wiki">
              <a
                className="song__link"
                href={`https://es.wikipedia.org/w/index.php?search=${artist.name}+music`} target="_blank" rel="noreferrer">
                Wiki del artista
              </a>
            </p>
          </div>
        </div>
      </article>
    </section>
  )
};

export default SongArtist;