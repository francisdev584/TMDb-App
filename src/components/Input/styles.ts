import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fafafa;
  border-radius: 20px;
  margin-bottom: 8px;
  border-width: 3px;
  border-color: #fafafa;

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff0000;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #01b4e4;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`;
