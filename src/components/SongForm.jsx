// CSS
import "../css/SongForm.css";

// Hooks
import { useState } from "react";

const initialForm = {
  artist: "",
  song: "",
}

const SongForm = ({ handleSearch }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.toLowerCase()
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.song || !form.artist) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    handleSearch(form);

    setForm(initialForm);
  }

  return (
    <section className="section__form">
      <div className="form__container">
        <form className="form form__search" onSubmit={handleSubmit}>
          <div className="form__content">
            <h2 className="form__title">Busca tu rolita...</h2>
            <div className="form__inputs">
              <input
                type="text"
                name="song"
                className="form__input"
                placeholder="Nombre de la canción"
                onChange={handleChange}
                value={form.song}
                autoComplete="off"
              />
              <input
                type="text"
                name="artist"
                className="form__input"
                placeholder="Nombre del artista"
                onChange={handleChange}
                value={form.artist}
                autoComplete="off"
              />
            </div>
            <button className="form__button">Buscar</button>
          </div>
        </form>
      </div>
    </section>
  )
};

export default SongForm;