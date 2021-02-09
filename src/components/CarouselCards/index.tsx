/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import api from '../../services/api';

import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../CarouselCardItem';

interface IRequest {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

interface CarouselData {
  imgUrl: string;
  title: string;
  body: string;
  id: number;
}

const CarouselCards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [trendingWeek, setTrendingWeek] = useState<CarouselData[]>([]);
  const isCarousel = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      await api
        .get('/trending/movie/week')
        .then(response => {
          const { results } = response.data;
          const dataMoviesTR = results.map((result: IRequest) => {
            return {
              imgUrl: result.poster_path,
              title: result.title,
              body: result.release_date,
              id: result.id,
            };
          });
          setTrendingWeek(dataMoviesTR);
        })
        .catch(error => console.log(error));
    };
    loadData();
  }, []);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={19}
        ref={isCarousel}
        data={trendingWeek}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={Index => setIndex(Index)}
        useScrollView
      />
      <Pagination
        dotsLength={trendingWeek.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255,255,255,0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots
      />
    </View>
  );
};

export default CarouselCards;
