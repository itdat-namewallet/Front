import React from 'react';
import cards from '../../data/cards.json';
import '../../assets/css/pages/main/BusinessCardPage.css';

export default function BusinessCardPage() {
  const getImagePath = (filename) => require(`../../assets/images/card/${filename}`);

  return (
    <div className="business-card-page">
      <h1>ITDAT 명함</h1>
      <p>ITDAT만의 다양한 명함 디자인을 만나보세요.</p>
      <div className="card-grid">
          {cards.map((card) => (
              <div
                  key={card.id}
                  className="card-item"
                  onMouseEnter={(e) =>
                      (e.currentTarget.querySelector('.card-image').src = getImagePath(card.hoverImage))
                  }
                  onMouseLeave={(e) =>
                      (e.currentTarget.querySelector('.card-image').src = getImagePath(card.image))
                  }
              >
                  {card.isSoldOut && <div className="soldout-overlay"></div>}
                  
                  <img
                      src={getImagePath(card.image)}
                      alt={card.title}
                      className="card-image"
                  />
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-price">{card.price}</p>
                  <p className="card-description">{card.description}</p>
              </div>
          ))}
      </div>
      <div className="notice-message">
        <p>현재 이용에 불편을 드려 죄송합니다. 회사 내부 사정으로 인해 오픈이 잠시 미뤄졌습니다.</p>
        <p>양해 부탁드립니다.</p>
      </div>
    </div>
  );
}
