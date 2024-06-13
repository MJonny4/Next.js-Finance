import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

const RadarVariant = ({ data = [] }: Props) => {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <RadarChart cx={'50%'} cy={'50%'} outerRadius={'60%'} data={data}>
                <PolarGrid />
                <PolarAngleAxis
                    dataKey='name'
                    style={{
                        fontSize: '0.75rem',
                    }}
                />
                <PolarRadiusAxis
                    style={{
                        fontSize: '0.75rem',
                    }}
                />
                <Radar dataKey='value' stroke='#3D82F6' fill='#3D82F6' fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}
export default RadarVariant
