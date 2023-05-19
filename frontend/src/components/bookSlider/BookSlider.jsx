import React from 'react'
import Slider from 'react-slick'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import './BookSlider.scss'
import { books } from '../../data';

function NextArrow(props) {
    const { style, onClick } = props;
    return (
        <div
          className='arrow right__arrow'
          onClick={onClick}
          style={{ 
            ...style
          }}
        >
          < BiChevronRight />
        </div>
    );
  }
  
  function PrevArrow(props) {
      const { style, onClick } = props;
      return (
        <div
          className='arrow left__arrow'
          onClick={onClick}
          style={{ 
              ...style
          }}
        >
          < BiChevronLeft />
        </div>
      );
    }

const BookSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow/>,
        responsive: [
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 499,
              settings: {
                slidesToShow: 3,
              }
            },
            {
                breakpoint: 370,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 269,
                settings: {
                  slidesToShow: 1,
                }
            }
          ]
    };

  return (
    <div className='item__slider'>
        <h3>Top Selling Books</h3>
        <Slider {...settings} className='slick__container'>
            {books.map(book => (
                <div key={book.id} className='book__slider'>
                    <div  className="book__container">
                        <img src={book.url} alt='book' />
                    </div>
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default BookSlider