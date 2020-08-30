import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import './MovieCarousel.css';

function MovieCarousel({ title, items }) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let scrollValue = scrollX + Math.round(window.innerWidth / 2);
    if (scrollValue > 0) {
      scrollValue = 0;
    }
    setScrollX(scrollValue)
  }

  const handleRightArrow = () => {
    let scrollValue = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.results.length * 150;
    if ((window.innerWidth - listWidth) > scrollValue) {
      scrollValue = (window.innerWidth - listWidth) - 60;
    }
    setScrollX(scrollValue)

  }

  return (
    <div className="movieCarousel">
      <h2>{title}</h2>

      <div className="movieCarousel--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieCarousel--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieCarousel--listarea">
        <div 
          className="movieCarousel--list"
          style={{ 
            marginLeft: scrollX,
            width: items.results.length * 150
          }}
        >
          {items.results.length > 0 && 
            items.results.map((item, key) => (
              <div key={key} className="movieCarousel--item">
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
              </div>
            ))
          }
        </div>
       
      </div>
    </div>
  );
}

export default MovieCarousel;