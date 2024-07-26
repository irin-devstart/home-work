import React from 'react';
import { Paper } from '@mui/material';
import {
  ArgumentAxis,
  ValueAxis,
  Chart as MuiChart,
  SplineSeries,
  ChartProps as MuiChartProps,
  SplineSeriesProps
} from '@devexpress/dx-react-chart-material-ui';
interface ChartProp extends MuiChartProps {
  seriesProps: SplineSeriesProps;
}
const Chart = ({ seriesProps, ...props }: ChartProp) => {
  return (
    <Paper
      sx={{
        pt: '2em'
      }}
    >
      <MuiChart {...props}>
        <ArgumentAxis />

        <ValueAxis
          labelComponent={({ text, ...props }) => {
            return <ValueAxis.Label text={`Rp. ${text}`} {...props} />;
          }}
        />

        <SplineSeries {...seriesProps} />
      </MuiChart>
    </Paper>
  );
};

export default Chart;
