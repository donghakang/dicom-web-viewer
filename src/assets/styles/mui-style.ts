import Slider, { SliderThumb } from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { theme } from '../../assets/styles/theme';

export const CustomSlider = styled(Slider)({
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: theme.color.primary2,
  },
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      backgroundColor: theme.color.primary2,
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.color.primary3,
    color: 'white',
  },
});

export const Input = styled(MuiInput)({
  color: 'white',
  '&:before': {
    borderBottomColor: 'white',
  },
  '&:after': {
    borderBottomColor: theme.color.primary,
  },
  '&:hover:not(.Mui-focused):before': {
    borderBottomColor: 'white',
  },
});
