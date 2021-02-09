/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { NavigationAction } from '@react-navigation/native';

import { TouchWithoutFeedback } from './styles';

import api from '../../services/api';

export const SLIDER_WIDTH = Dimensions.get('window').width + 8;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface CarouselData {
  item: {
    imgUrl: string;
    title: string;
    body: string;
    id: number;
  };
  index: number;
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

const CarouselCardItem: React.FC<CarouselData> = ({
  item,
  index,
}: CarouselData) => (
  <View style={styles.container} key={index}>
    <TouchWithoutFeedback>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w185${item.imgUrl}` }}
        style={styles.image}
      />
    </TouchWithoutFeedback>
    <Text style={styles.body}>{item.title}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    flex: 1,
    width: ITEM_WIDTH,
    height: 300,
  },
  body: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -30,
  },
});

export default CarouselCardItem;
