import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  background: #0d253f;
`;

export const IconContainer = styled.View`
  position: absolute;
  margin: 4px 4px;
`;

export const ContentContainer = styled.View`
  background: #0d253f;
  border-radius: 35px;
  margin-top: -15px;
`;

export const Movie = styled.View`
  border-radius: 60px;
  height: 400px;
  width: auto;
  flex: auto;
  background: #0d253f;
`;

export const PosterImage = styled.Image`
  height: 300px;
  width: 420px;
  align-self: flex-start;
`;

export const Title = styled.Text`
  font-size: 22px;
  margin: 8px 0px;
  margin-left: 12px;
  margin-top: -15px;
  color: #fff;
  font-weight: bold;
  font-family: 'RobotoSlab-Medium';
`;

export const Details = styled.Text`
  font-size: 22px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const Percent = styled.Text`
  font-size: 10px;
  color: #fff;
`;

export const ReleaseYear = styled.Text`
  font-size: 12px;
  margin: 4px 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const BudgetValue = styled.Text`
  font-size: 12px;
  font-weight: 500;
  margin-left: 12px;
  margin: 4px 12px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const SecondTitle = styled.Text`
  color: #fff;
  margin: 4px 12px;
  font-size: 12px;
  margin-bottom: 14px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;

export const Description = styled.Text`
  color: #fff;
  margin: 4px 10px;
  font-size: 12px;
  margin-bottom: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const GenresTitle = styled.Text`
  color: #fff;
  margin: 4px 10px;
  font-size: 12px;
  margin-bottom: 5px;
  font-family: 'RobotoSlab-Regular';
`;

export const Genres = styled.View`
  flex-direction: row;
`;

export const GenreItem = styled.Text`
  position: relative;
  elevation: 10;
  padding: 3px 6px;
  border-radius: 15px;
  border: 2px lightseagreen;
  border-color: #aaa;
  background: ${darken(0.15, '#ff9000')};
  color: #fff;
  font-weight: 600;
  margin: 3px 3px;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-family: 'RobotoSlab-Regular';
`;

export const TouchOpacity = styled.TouchableOpacity``;
