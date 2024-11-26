import {Box, Flex, FormLabel, Icon, Image} from '@chakra-ui/react';

import IconBox from "../../../../components/icons/IconBox";
import MiniStatistics from "../../../../components/card/MiniStatistics";
import React from "react";
import Usa from "../../../../img/dashboards/usa.png";
export default function StatisticsCard(props: {
	boxBg: string
	brandColor: string
	cardIcon: any
	total: number
	title: string
	hasEnd?: boolean
}) {
	const { ...rest } = props;

	return (
		<MiniStatistics
			startContent={
				<IconBox
					w="56px"
					h="56px"
					bg={props.boxBg}
					icon={
						<Icon w="32px" h="32px" as={props.cardIcon} color={props.brandColor} />
					}
				/>
			}
			name={props.title}
			value={`$${props.total} `}
		/>
	);
}
