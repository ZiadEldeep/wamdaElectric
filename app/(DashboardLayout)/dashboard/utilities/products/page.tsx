"use client";
import React, { useState } from 'react';
import Products from '@/components/Products';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Box, Button, Tooltip, TextField, MenuItem, Pagination } from '@mui/material';
import Link from 'next/link';
import { IconLayoutGridAdd, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Spin } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    category: '',
    unit: '',
    unitCost: '',
    salePrice: '',
    wholesale1: '',
    wholesale2: '',
    exhibitSalePrice: '',
    websiteSalePrice: '',
    purchasePrice: '',
    rating: null as number | null, // Specify the type here
    barcode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const fetchCategories = async () => {
    const response = await axios.get("/api/categories");
    return response.data;
  };
  // Fetch products function
  const fetchProducts = async () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    params.append('page', currentPage.toString());
    params.append('pageSize', pageSize.toString());

    for (const key in filters) {
      //@ts-ignore
      if (filters[key]) {
        //@ts-ignore
        params.append(key, filters[key].toString());
      }
    }

    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data: products, error, isLoading,refetch } = useQuery({
    queryKey: ['products', searchTerm, currentPage, filters],
    queryFn: fetchProducts,
  });
  const { data: categories, isLoading:isLoading2 } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert message="Error fetching products" description={error.message} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <Box sx={{ display: 'flex',gap:"10px",flexWrap:"wrap", alignItems: 'center',}}>
        <div className="flex justify-between items-center max-sm:w-full flex-grow mb-2">

        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          className=''
          />
        <Tooltip title="Add New Category" arrow>
          <Link href="/dashboard/utilities/categories/add" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IconPlus />}
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              >
              Add Category
            </Button>
          </Link>
        </Tooltip>
              </div>
              <div className="flex justify-between items-center max-sm:w-full gap-4 mb-2 ">
        <Products refetch={refetch} />
        <Tooltip title="Add a new product" arrow>
          <Link href="/dashboard/utilities/products/add" passHref>
            <Button variant="contained" color="primary" startIcon={<IconLayoutGridAdd />}>
              Add Product
            </Button>
          </Link>
        </Tooltip>
      </div>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          select
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          variant="outlined"
          className='w-44'
        >
          {isLoading2 ? (
                  <MenuItem value="">Loading categories... <Spin/></MenuItem>
                ) : (
                  categories?.map((category: { _id: string; name: string }) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
        </TextField>

        <TextField
          label="Barcode" 
          name="barcode"
          value={filters.barcode}
          onChange={handleInputChange}
          variant="outlined"
        />

        <TextField
          label="Unit"
          name="unit"
          value={filters.unit}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Unit Cost"
          name="unitCost"
          value={filters.unitCost}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Sale Price"
          name="salePrice"
          value={filters.salePrice}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Wholesale 1"
          name="wholesale1"
          value={filters.wholesale1}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Wholesale 2"
          name="wholesale2"
          value={filters.wholesale2}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Exhibit Sale Price"
          name="exhibitSalePrice"
          value={filters.exhibitSalePrice}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Website Sale Price"
          name="websiteSalePrice"
          value={filters.websiteSalePrice}
          onChange={handleInputChange}
          variant="outlined"
        />
        
        <TextField
          label="Purchase Price"
          name="purchasePrice"
          value={filters.purchasePrice}
          onChange={handleInputChange}
          variant="outlined"
        />
         <TextField
          select
          label="Items per Page"
          value={pageSize.toString()}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
          variant="outlined"
          className='w-44'
        >
          {[4, 8, 12, 16, 20, 24].map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
        {/* Replace Rating TextField with Rating component */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>Rating:</Typography>
          <Rating
            name="rating"
            value={filters.rating}
            onChange={(event, newValue) => {
              setFilters({ ...filters, rating: newValue }); // Update the rating value
            }}
          />
        </Box> */}

       
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Pagination
          count={Math.ceil(products?.total / pageSize)} // Assuming you have total products count from API
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
          <Spin size="large" />
        </div>
      )}

      {!isLoading && <Blog products={products.products} role='admin' />}
    </div>
  );
};

export default page;
