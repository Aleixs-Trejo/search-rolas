// CSS
import "../css/SongSearch.css";

// Hooks
import { useState, useEffect } from "react";

// Components
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";
import Loader from "./Loader";

// Helpers
import { helpHttp } from "../helpers/helpHttp";

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [artist, setArtist] = useState(null);
  const [music, setMusic] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    
    const fetchData = async () => {
      const { artist, song } = search;
      let artistUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=359068a0c00cee1077c6b8250442f33a&format=json`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      let musicUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=359068a0c00cee1077c6b8250442f33a&artist=${artist}&track=${song}&format=json`;

      setIsLoading(true);

      try {
        const [artistData, songData, musicData] = await Promise.all([
          helpHttp().get(artistUrl),
          helpHttp().get(songUrl),
          helpHttp().get(musicUrl),
        ]);
  
        setArtist(artistData);
        setLyric(songData);
        setMusic(musicData);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
        setArtist(null);
        setLyric(null);
        setMusic(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [search]);

  const handleSearch = (data) => {
    setSearch(data);
  }

  return (
    <div className="song__search__container">
      <SongForm
        handleSearch={handleSearch}
      />
      {isLoading && <Loader />}
      {search && !isLoading && (
        <SongDetails
          search={search}
          artist={artist}
          lyrics={lyric}
          music={music}
        />
      )}
    </div>
  )
};

export default SongSearch;