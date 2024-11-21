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
  const [bio, setBio] = useState(null);
  const [music, setMusic] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [deezer, setDeezer] = useState(null);
  const [spotify, setSpotify] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    // Primero limpiamos consola
    console.clear();
    
    const fetchData = async () => {
      const { artist, song } = search;
      let artistUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=359068a0c00cee1077c6b8250442f33a&format=json`;
      let songUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
      let musicUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=359068a0c00cee1077c6b8250442f33a&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(song)}&format=json`;
      let deezerUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(song)}+${encodeURIComponent(artist)}`;
      let optionsDeezer = {
        method: "GET",
        headers: {
          'x-rapidapi-key': 'd498676ea4mshb5fa1046e186768p15bc23jsn07c77bec81e6',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      }

      let soptifyUrl = `https://spotify23.p.rapidapi.com/search/?q=${song}+${artist}&type=multi&offset=0&limit=1&numberOfTopResults=1`;
      let optionsSpotify = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "d28f99b928mshd47f28f3ab35126p1cb27ajsncd22da7836b7",
	        "x-rapidapi-host": "spotify23.p.rapidapi.com"
        }
      };

      setIsLoading(true);

      try {
        const [artistData, songData, musicData, deezerData, spotifyData] = await Promise.all([
          helpHttp().get(artistUrl),
          helpHttp().get(songUrl),
          helpHttp().get(musicUrl),
          helpHttp().get(deezerUrl, optionsDeezer),
          helpHttp().get(soptifyUrl, optionsSpotify),
        ]);

        let bioArtistUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${deezerData.data[0].artist.id}`;
        const bioArtistData = await helpHttp().get(bioArtistUrl, optionsDeezer);

        // console.log("Artistas de Spotify: ", spotifyData.artists);

        let artistSpotify = spotifyData.artists.items[0].data.uri;
        let idArtistSpotify = artistSpotify.split(":")[2];

        let idArtistUrl = `https://spotify23.p.rapidapi.com/artists/?ids=${idArtistSpotify}`;
        const artistSpotifyData = await helpHttp().get(idArtistUrl, optionsSpotify);

        // console.log("Datos del id del artista de Spotify: ", artistSpotifyData);

        setArtist(artistData);
        setLyric(songData);
        setMusic(musicData);
        setDeezer(deezerData.data[0]);
        setBio(bioArtistData);
        setSpotify(artistSpotifyData);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
        setArtist(null);
        setLyric(null);
        setMusic(null);
        setDeezer(null);
        setBio(null);
        setSpotify(null);
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
          deezer={deezer}
        />
      )}
    </div>
  )
};

export default SongSearch;