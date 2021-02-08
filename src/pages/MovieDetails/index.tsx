/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import ProgressCircle from 'react-native-progress-circle';
import IconFeather from 'react-native-vector-icons/Feather';
import { string } from 'yup';

import api from '../../services/api';

import {
  Container,
  IconContainer,
  ContentContainer,
  Movie,
  PosterImage,
  Details,
  SecondTitle,
  ReleaseYear,
  Description,
  Genres,
  GenresTitle,
  GenreItem,
  TouchOpacity,
  Title,
  Percent,
  BudgetValue,
} from './styles';

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
  backdrop_path: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
}

interface IMovieDetails {
  movieId: number;
}

// eslint-disable-next-line react/prop-types
const MovieDetails: React.FC<IMovieDetails> = ({ movieId }) => {
  const [actualMovie, setActualMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        // .get(`/movie/${movieId}`)
        .get(`/movie/464052`)
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
    loadProducts();
  }, []);

  return (
    <Container>
      <Movie key={actualMovie.id}>
        <PosterImage
          source={{
            uri: `https://image.tmdb.org/t/p/w780${actualMovie.poster}`,
          }}
        />
        <IconContainer>
          <TouchOpacity>
            <IconFeather name="arrow-left" color="#fff" size={30} />
          </TouchOpacity>
        </IconContainer>
        <ContentContainer>
          <ProgressCircle
            percent={actualMovie.vote * 10}
            radius={38}
            borderWidth={5}
            color="#90cea1"
            shadowColor="#575656"
            bgColor="#0d253f"
            outerCircleStyle={{
              position: 'relative',
              alignSelf: 'flex-end',
              marginTop: -40,
              marginRight: 20,
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Details>
              {actualMovie.vote * 10}
              <Percent>%</Percent>
            </Details>
          </ProgressCircle>
          <Title>{actualMovie.title}</Title>
          <SecondTitle>Sinopse</SecondTitle>
          <Description>{actualMovie.overview}</Description>
          <ReleaseYear>{`O Filme foi Lançado em ${actualMovie.releaseDate}`}</ReleaseYear>
          <SecondTitle>
            Custo Total:{' '}
            <BudgetValue>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(actualMovie.budget)}
            </BudgetValue>
          </SecondTitle>
          <SecondTitle>Gênero</SecondTitle>
          <GenresTitle>
            <Genres>
              {actualMovie.genres &&
                actualMovie.genres.map(genre => (
                  <GenreItem key={genre.id}>{genre.name}</GenreItem>
                ))}
            </Genres>
          </GenresTitle>
        </ContentContainer>
      </Movie>
    </Container>
  );
};

export default MovieDetails;
