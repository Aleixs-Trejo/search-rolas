// CSS
import "../css/SongArtist.css";

// Hooks
import { useState } from "react";

// Assets
import arrow from "../assets/icon-arrow-white.svg";

const SongArtist = ({ artist, deezer }) => {

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

        </div>
        <div className="song__artist__about">
          <div className="artist__info">
            <h2 className="song__artist__name">{deezer.artist.name}</h2>
            <span className="song__artist__listeners">{artist.stats ? formatNumber(artist.stats.listeners) : "0"} oyentes</span>
          </div>
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
          <div className={`song__artist__bio ${showInfo ? "show__info" : ""}`}>
            <div className="song__artist__bio__container">
              <p className="song__artist__bio__text" dangerouslySetInnerHTML={{ __html: artist.bio.summary }} />
            </div>
            <button className="song__artist__bio__button" onClick={() => setShowInfo(!showInfo)}>
              <img className="arrow__icon" src={arrow} alt="Icono de flecha" />
            </button>
          </div>
          <div className="song__artist__more">
            <p className="song__artist__bio__profile">
              <a className="song__link" href={artist.bio.links.link.href} target="_blank" rel="noreferrer">Perfil del artista</a>
            </p>
            <p className="song__artist__bio__wiki">
              <a
                className="song__link"
                href={`https://es.wikipedia.org/w/index.php?search=${artist.name}+grupo`} target="_blank" rel="noreferrer">
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