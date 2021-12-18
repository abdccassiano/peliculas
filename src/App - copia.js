import logo from './logo.svg';
import './App.css';
import Pelicula from './Pelicula';
import PageWrapper from './PageWrapper';
import PeliculasJson from './Peliculas.json';
import Paginacion from './Paginacion'
import { useState } from 'react';

function App() {

  const [paginaActual, setPaginaActual] = useState(1);
  //const [peliculas, setPeliculas] = useState([]);
  const TOTAL_POR_PAGINA = 7;

  //Extraemos un json en local
  let peliculas = PeliculasJson;

  const buscarPeliculas = async () => {
    let url = 'https://lucasmoy.dev/data/react/peliculas.json';

    // https://cors-anywhere.herokuapp.com/ para solucionar los cords se coloca esta página antes de la url

    /*var respuesta = await fetch(url, {
      "method": "GET",
      "mode": "no-cors",
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://raw.githubusercontent.com/'
      }
    });*/

    var respuesta = await fetch(url, {
      "method": "GET",
      "mode": "no-cors",
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      }
    });

    let json = await respuesta.json();
    //setPeliculas(json);
  }

  //buscarPeliculas();

  const cargarPeliculas = () => {
    peliculas = peliculas.slice(
      (paginaActual - 1) * TOTAL_POR_PAGINA, 
      paginaActual * TOTAL_POR_PAGINA
      );
  }
    const getTotalPaginas = () => {
      let cantidadTotalDePeliculas = PeliculasJson.length;
      return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
    }

    cargarPeliculas();
  return (
    <PageWrapper>

      {peliculas.map(pelicula => {
        return (
        <Pelicula titulo={pelicula.titulo} calificacion={pelicula.calificacion} 
        director={pelicula.director} actores={pelicula.actores} fecha={pelicula.fecha} 
        duracion={pelicula.duracion} img={pelicula.img}>
          {pelicula.descripcion}
        </Pelicula>
        )
      })}

      <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

    </PageWrapper>
  );
}

export default App;
