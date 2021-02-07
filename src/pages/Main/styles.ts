import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  background: #0d253f;
`;

export const Movie = styled.View`
  margin: 15px;
  border-radius: 8px;
  width: 118px;
`;

export const PosterImage = styled.Image`
  height: 185px;
  width: 118px;
  border-radius: 8px;
`;

export const CategoryTitle = styled.Text`
  font-size: 22px;
  margin: 12px 0px;
  margin-left: 12px;
  color: #fff;
  font-weight: bold;
  font-family: 'Geneva';
`;

export const Details = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const Percent = styled.Text`
  font-size: 8px;
  color: #fff;
`;

export const ReleaseYear = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const MovieTitle = styled.Text`
  color: #fff;

  margin: 8px 0px;
  font-size: 12px;
  margin-bottom: 14px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;

export const TouchOpacity = styled.TouchableOpacity``;

export const AddButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;

export const ProductAmount = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#ff9000')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;
