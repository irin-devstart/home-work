import { Stack, styled, Grid, Typography } from '@mui/material';

interface ColorInformationProps {
  color: string;
  label: string;
}

const StyledDot = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor'
})<{
  backgroundColor: string;
}>(({ theme, backgroundColor }) => ({
  background: backgroundColor,
  width: '1em',
  height: '1em',
  borderRadius: '50%',
  boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .25)'
}));

const ColorInformation = ({ label, color }: ColorInformationProps) => {
  return (
    <Stack direction='row' gap={1} alignItems='center'>
      <StyledDot backgroundColor={color} />
      <Typography variant='h6'>{label}</Typography>
    </Stack>
  );
};

export default ColorInformation;
