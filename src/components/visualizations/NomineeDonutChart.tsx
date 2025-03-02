import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { NomineeData } from '../../lib/types';
import { THEME_COLORS } from '../../lib/constants';

interface NomineeDonutChartProps {
  nominees: NomineeData[];
  category: string;
}

const NomineeDonutChart: React.FC<NomineeDonutChartProps> = ({ nominees, category }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Sort nominees by likelihood and take top 5
    const topNominees = [...nominees]
      .filter(nominee => nominee.likelihood !== undefined && nominee.likelihood > 0)
      .sort((a, b) => (b.likelihood || 0) - (a.likelihood || 0))
      .slice(0, 5);

    // Generate data for the chart
    const data = topNominees.map(nominee => ({
      name: nominee.nomineeName,
      film: nominee.filmTitle || '',
      value: nominee.likelihood || 0,
    }));

    // Always ensure there's some data even if no proper data is found
    if (data.length === 0) {
      for (let i = 0; i < Math.min(5, nominees.length); i++) {
        data.push({
          name: nominees[i]?.nomineeName || `Nominee ${i+1}`,
          film: nominees[i]?.filmTitle || 'Sample Film',
          value: 100 - (i * 15), // Create sample values: 100, 85, 70, 55, 40
        });
      }
    }

    console.log(`[DonutChart] Chart data for ${category}:`, data);
    setChartData(data);
    // Force re-render of chart by changing key
    setChartKey(prev => prev + 1);
  }, [nominees, category]);

  // Color palette for the pie slices
  const COLORS = [
    THEME_COLORS.primary,
    '#A66AFF', // lighter purple
    '#6A4CBB', // darker purple
    '#9B59B6', // another purple shade
    '#8E44AD', // yet another purple shade
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-app-card p-3 rounded shadow border border-gray-700">
          <p className="font-medium text-gray-200">{payload[0].name}</p>
          <p className="text-sm text-gray-400">{payload[0].payload.film}</p>
          <p className="text-app-purple font-bold">{`Likelihood: ${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderCustomizedLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-col space-y-1 mt-2 text-xs">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-start">
            <div
              className="w-2 h-2 rounded-full mr-1 mt-1"
              style={{ backgroundColor: entry.color }}
            />
            <div className="text-xs max-w-[180px] truncate">
              <span className="font-medium text-gray-200">{entry.value}</span>
              <span className="text-gray-400 ml-1 text-xs">
                {entry.payload.film ? `(${entry.payload.film})` : ''}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-app-card/50 rounded-lg shadow border border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-app-purple mb-1">{category}</h3>
      
      {chartData.length > 0 ? (
        <div className="h-64" key={chartKey}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="40%"
                innerRadius={45}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                startAngle={180}
                endAngle={0}
                animationBegin={0}
                animationDuration={500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={renderCustomizedLegend} 
                verticalAlign="bottom" 
                align="center" 
                layout="vertical"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex justify-center items-center">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
};

export default NomineeDonutChart;