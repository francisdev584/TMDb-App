/* eslint-disable camelcase */
import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle';
import IconFeather from 'react-native-vector-icons/Feather';

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
interface IMovieDetails {
  MovieId: number;
}

// eslint-disable-next-line react/prop-types
const MovieDetails: React.FC<IMovie> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { MovieData } = route.params;

  return (
    <ScrollView horizontal showsVerticalScrollIndicator>
      <Container>
        {MovieData && (
          <Movie key={MovieData.id}>
            <PosterImage
              source={{
                uri: `https://image.tmdb.org/t/p/w780${MovieData.poster}`,
              }}
            />
            <IconContainer>
              <TouchOpacity onPress={() => navigation.goBack()}>
                <IconFeather name="arrow-left" color="#fff" size={30} />
              </TouchOpacity>
            </IconContainer>
            <ContentContainer>
              <ProgressCircle
                percent={MovieData.vote * 10}
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
                  {MovieData.vote * 10}
                  <Percent>%</Percent>
                </Details>
              </ProgressCircle>
              <Title>{MovieData.title}</Title>
              <SecondTitle>Sinopse</SecondTitle>
              <Description>{MovieData.overview}</Description>
              <ReleaseYear>{`O Filme foi Lançado em ${MovieData.releaseDate}`}</ReleaseYear>
              <SecondTitle>
                Custo Total:{' '}
                <BudgetValue>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(MovieData.budget)}
                </BudgetValue>
              </SecondTitle>
              <SecondTitle>Gênero</SecondTitle>
              <GenresTitle>
                <Genres>
                  {MovieData.genres &&
                    MovieData.genres.map(genre => (
                      <GenreItem key={genre.id}>{genre.name}</GenreItem>
                    ))}
                </Genres>
              </GenresTitle>
            </ContentContainer>
          </Movie>
        )}
      </Container>
    </ScrollView>
  );
};

export default MovieDetails;
