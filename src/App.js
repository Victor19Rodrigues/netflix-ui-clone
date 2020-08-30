import React, { useEffect, useState } from 'react';

import Tmdb from './services/Tmdb';
import MovieCarousel from './components/MovieCarousel';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

import './App.css';

function App() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(element => element.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando" />
        </div>
      }
      <Header black={blackHeader} />

      {featuredData && 
        <FeaturedMovie  item={featuredData} />
      }

      <section className="lists">
        {movieList &&
          movieList.map((item, key) => (
            <MovieCarousel key={key} title={item.title} items={item.items} />
          ))
        }
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pelo Victor Rodrigues <br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>
    </div>
  )
}

export default App;