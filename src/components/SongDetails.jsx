import Message from "./Message";
import SongArtist from "./SongArtist";
import SongMusic from "./SongMusic";

const SongDetails = ({ search, lyrics, artist, music, deezer }) => {
  if (!lyrics || !artist) return null;

  return (
    <section className="song__details__section">
      {
        music && music.track
        ? (<SongMusic lyric={lyrics} music={music} deezer={deezer} />)
        : (<Message text={`No se encontró info de la canción "${search.song}"`} />)
      }
      {
        artist && artist.artist && artist.artist.bio
        ? (<SongArtist artist={artist.artist} deezer={deezer} />)
        : (<Message text={`No se encontró info de "${search.artist}"`} />)
      }
    </section>
  )
};

export default SongDetails;