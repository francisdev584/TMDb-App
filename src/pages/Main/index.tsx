/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

interface IMovie {
  id: number;
  poster: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
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
  const [actualMovie, setActualMovie] = useState<IMovie>();

  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
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
    loadData();
  }, []);

  useEffect(() => {
    actualMovie &&
      navigation.navigate('MovieDetails', { MovieData: actualMovie });
  }, [actualMovie, navigation]);

  const loadMovie = async (id: number) => {
    await api
      .get(`/movie/${id}`)
      .then(response => {
        const movie = response.data;
        const dataMovie: IMovie = {
          id: movie.id,
          poster: movie.backdrop_path,
          budget: movie.budget,
          overview: movie.overview,
          genres: movie.genres,
          releaseDate: new Date(movie.release_date).getFullYear(),
          title: movie.title,
          vote: movie.vote_average,
        };

        setActualMovie(dataMovie);
      })
      .catch(error => console.log(error));
  };

  function renderMovies({ item }: any) {
    return (
      <Movie key={item.id}>
        <TouchOpacity onPress={() => loadMovie(item.id)}>
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
        keyExtractor={item => String(item.id)}
        renderItem={renderMovies}
      />
    </Container>
  );
};

export default Main;
