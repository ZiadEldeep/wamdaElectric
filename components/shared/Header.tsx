import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconHome, IconShoppingCart, IconList, IconInfoCircle, IconMenu, IconX } from '@tabler/icons-react'; // Import icons
import { motion } from 'framer-motion';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import Profile from '@/app/(DashboardLayout)/layout/header/Profile';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
const Header = () => {
  
  const router = useRouter(); // Initialize the router
  const [drawerOpen, setDrawerOpen] = useState(false); // State for managing the drawer open/close
  const [isLogin, setisLogin] = useState(false)
  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setDrawerOpen(open);
  };

  // Function to handle navigation and close the drawer
  const handleNavigation = (path: string) => {
    router.push(path);
    toggleDrawer(false)(); // Close the drawer
  };

  // Drawer navigation items
  const drawerItems = (
    <div className="flex flex-col p-4">
      <button
        className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
        onClick={() => handleNavigation('/')}
      >
        <IconHome />
        <span>Home</span>
      </button>
      <button
        className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
        onClick={() => handleNavigation('/products')}
      >
        <IconShoppingCart />
        <span>Products</span>
      </button>
      <button
        className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
        onClick={() => handleNavigation('/categories')}
      >
        <IconList />
        <span>Categories</span>
      </button>
      <button
        className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
        onClick={() => handleNavigation('/about')}
      >
        <IconInfoCircle />
        <span>About</span>
      </button>
    </div>
  );

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <motion.div 
          className='flex items-center' 
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}
          style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
          onClick={() => { handleNavigation('/'); }} // Close drawer on logo click
        >
          <Logo /> 
        </motion.div>

        {/* IconButton to open the drawer */}
      

        {/* Drawer for mobile navigation */}
        {drawerOpen && (
          <div className="fixed inset-0 bg-white shadow-lg z-50 md:hidden">
            <div className="flex justify-between items-center p-4">
            <motion.div 
          className='flex items-center' 
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}
          style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
          onClick={() => { handleNavigation('/'); }} // Close drawer on logo click
        >
          <Logo /> 
        </motion.div>
              <button onClick={toggleDrawer(false)} className="p-2 text-gray-600">
                <IconX /> {/* Close Icon */}
              </button>
            </div>
            <div className="w-1/2 p-4"> {/* Set drawer width to 50% */}
              {drawerItems}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="flex gap-2">
        <nav className="hidden md:flex space-x-4">
          <button
            className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
            onClick={() => handleNavigation('/')}
            >
            <IconHome />
            <span>Home</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
            onClick={() => handleNavigation('/products')}
            >
            <IconShoppingCart />
            <span>Products</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
            onClick={() => handleNavigation('/categories')}
            >
            <IconList />
            <span>Categories</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 text-gray-600 hover:underline"
            onClick={() => handleNavigation('/about')}
            >
            <IconInfoCircle />
            <span>About</span>
          </button>
        </nav>
          <Stack spacing={1} direction="row" alignItems="center">
         {!isLogin && <Button
            variant="contained"
            component={Link}
            href="/authentication/login"
            disableElevation
            color="primary"
            >
            Login
          </Button>}
        <Profile setisLogin={setisLogin} />
        </Stack>
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={toggleDrawer(true)} // Toggle the drawer
        >
          <IconMenu />
        </button>
            </div>
      </div>
    </header>
  );
};

export default Header;
