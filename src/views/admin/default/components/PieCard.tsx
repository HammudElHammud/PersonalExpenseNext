import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { pieChartOptions } from 'variables/charts';
import { VSeparator } from 'components/separator/Separator';
export default function Conversion(props: {
	monthExpenses: any
	monthIncome: any
	totalExpenses: number
	totalIncomes: number
	showFilter?: boolean
}) {
	const { ...rest } = props;
	const pieChartData = [props.totalIncomes, props.totalExpenses, props.totalIncomes - props.totalExpenses]

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'
			    mt='10px'
			>
				<Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
					Your Pie Chart
				</Text>

			</Flex>

			<PieChart h='100%' w='100%' chartData={pieChartData} chartOptions={pieChartOptions} />
			<Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Your Save
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{props.totalIncomes -props.totalExpenses} k
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Income
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{props.totalIncomes} k
					</Text>
				</Flex>
			</Card>
		</Card>
	);
}
