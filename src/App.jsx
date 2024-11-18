// CSS
import './App.css'
import SongSearch from './components/SongSearch'

function App() {

  return (
    <div className="App">
      <section className="app__container">
        <h1 className="app__title">Buscador de rolitas</h1>
        <div className="app__content">
          <SongSearch />
        </div>
      </section>
    </div>
  )
}

export default App
