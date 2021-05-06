import React, { memo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import useStyle from './styles';

interface Props {
  chartData: AggregatesBar[];
}

const SymbolChart = ({ chartData }: Props) => {
  const cn = useStyle();

  return (
    <section className={cn.container}>
      <ResponsiveContainer>
        <LineChart className={cn.chart} data={chartData}>
          <Line type="monotone" dataKey="value" stroke="#e51616" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default memo(SymbolChart);
