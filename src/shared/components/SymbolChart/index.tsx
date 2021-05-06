import React, {memo} from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import useStyle from './styles';

interface Props {
    chartData: AggregatesBar[]
}

const SymbolChart = ({chartData}: Props) => {
    const cn = useStyle();

    return (
        <section className={cn.container}>
            <ResponsiveContainer height={332}>
                <LineChart width={1080} height={332} data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#e51616" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};

export default memo(SymbolChart);

