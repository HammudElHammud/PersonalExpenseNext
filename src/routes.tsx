import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdAttachMoney, MdPayments, MdBugReport
} from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';


// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';


const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Budgets',
    layout: '/admin',
    path: '/budgets',
    icon: (
        <Icon
            as={MdAttachMoney}
            width="20px"
            height="20px"
        />
    ),
    secondary: true,
  },
  {
    name: 'Transactions',
    layout: '/admin',
    path: '/transactions',
    icon: <Icon as={MdPayments} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Reports',
    layout: '/admin',
    path: '/reports',
    icon: <Icon as={FaFileAlt } width="20px" height="20px" color="inherit" />,
  },


];

export default routes;
