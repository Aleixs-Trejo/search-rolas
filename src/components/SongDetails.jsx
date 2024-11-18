import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyrics from "./SongLyrics";

// Hooks
import { useEffect } from "react";

const SongDetails = ({ search, lyrics, artist, music }) => {
  if (!lyrics || !artist) return null;

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    console.log("Detalles del artista: ", artist);
    console.log("Detalles del canción: ", music);
    console.log("Detalles de la letra: ", lyrics);
  }, []);

  const title = capitalizeFirstLetter(search.song);
  return (
    <section className="song__details__section">
      {lyrics.lyrics
        ? (<SongLyrics title={title} lyric={lyrics} music={music} />)
        : (<Message text={`No se encontró la canción "${search.song}"`} />)
      }
      {artist && artist.artist && artist.artist.bio
        ? (<SongArtist artist={artist.artist} />)
        : (<Message text={`No se encontró el artista "${search.artist}"`} />)        }
    </section>
  )
};

export default SongDetails;