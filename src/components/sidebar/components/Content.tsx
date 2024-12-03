import { Box, Flex, Stack } from '@chakra-ui/react';

import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import { IRoute } from 'types/navigation';



interface SidebarContentProps {
	routes: IRoute[];
	onclick: (value: string) => void
}

function SidebarContent(props: SidebarContentProps) {
	const { routes } = props;
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} onclick={props.onclick} />
				</Box>
			</Stack>

		</Flex>
	);
}

export default SidebarContent;
