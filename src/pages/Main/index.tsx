/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import api from '../../services/api';

import {
  Container,
  Movie,
  PosterImage,
  Details,
  MovieTitle,
  ReleaseYear,
  TouchOpacity,
  CategoryTitle,
  Percent,
} from './styles';

interface IMovies {
  id: number;
  poster: string;
  releaseDate: number;
  title: string;
  vote: number;
}

interface IRequest {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

const Main: React.FC = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get('/movie/top_rated')
        .then(response => {
          const { results } = response.data;
          const dataMovies = results.map((result: IRequest) => {
            return {
              id: result.id,
              poster: result.poster_path,
              releaseDate: new Date(result.release_date).getFullYear(),
              title: result.title,
              vote: result.vote_average,
            };
          });

          setMovies(dataMovies);
        })
        .catch(error => console.log(error));
    };
    loadProducts();
  }, []);

  function renderMovies({ item }) {
    return (
      <Movie key={item.id}>
        <TouchOpacity onPress={() => {}}>
          <PosterImage
            source={{
              uri: `https://image.tmdb.org/t/p/w154${item.poster}`,
            }}
          />

          <ProgressCircle
            percent={item.vote * 10}
            radius={18}
            borderWidth={4}
            color="#90cea1"
            shadowColor="#575656"
            bgColor="#0d253f"
            outerCircleStyle={{
              position: 'relative',
              marginTop: -20,
              marginLeft: 4,
              alignItems: 'center',
            }}
          >
            <Details>
              {item.vote * 10}
              <Percent>%</Percent>
            </Details>
          </ProgressCircle>
          <MovieTitle>{item.title}</MovieTitle>
          <ReleaseYear>{`Lançado em ${item.releaseDate}`}</ReleaseYear>
        </TouchOpacity>
      </Movie>
    );
  }

  return (
    <Container>
      <CategoryTitle>Filmes mais bem avaliados</CategoryTitle>
      <FlatList
        horizontal
        data={movies}
        // extraData={this.pros}
        keyExtractor={item => String(item.id)}
        renderItem={renderMovies}
      />
    </Container>
  );
};

export default Main;
