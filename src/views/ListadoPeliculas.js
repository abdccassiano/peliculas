import Pelicula from './Pelicula';
import PageWrapper from './PageWrapper';
import PeliculasJson from '../Peliculas.json';
import Paginacion from './Paginacion'
import { useEffect, useState } from 'react';

function ListadoPeliculas() {

  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const TOTAL_POR_PAGINA = 7;

  useEffect(() => {
    buscarPeliculas();
  }, []);

  //Extraemos un json en local
  //let peliculas = PeliculasJson;

  const buscarPeliculas = async () => {
    let url = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/lucasmoy-dev/Curso-de-React/main/Proyecto%202%20-%20Web%20de%20Peliculas/Proyecto%20Terminado/src/peliculas.json';
    //let url = 'https://cors-anywhere.herokuapp.com/https://lucasmoy.dev/data/react/peliculas.json';

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

    let respuesta = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        'Origin': 'https://raw.githubusercontent.com/'
      }
    });
    
    let json = await respuesta.json();
    setPeliculas(json);
  }

    const getTotalPaginas = () => {
      let cantidadTotalDePeliculas = peliculas.length;
      return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
    }

    let peliculasPorPagina = peliculas.slice(
      (paginaActual - 1) * TOTAL_POR_PAGINA, 
      paginaActual * TOTAL_POR_PAGINA
      );

  return (
    <PageWrapper>

      {peliculasPorPagina.map(pelicula => {
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

export default ListadoPeliculas;
