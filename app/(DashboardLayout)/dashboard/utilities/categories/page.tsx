'use client';

import React from 'react';
import { useCategories } from '@/hooks/useCategories'; // تأكد من وجود هذا الهوك
import { Box, Card, CardContent, CircularProgress, Tooltip, Typography, Grid, IconButton, Button } from '@mui/material';
import { IconTrash, IconEdit, IconEye, IconPlus } from '@tabler/icons-react'; // استخدام أيقونة IconPlus
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';

const CategoriesPage = () => {
  const { data, error, isLoading, refetch } = useCategories();

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success('Category deleted successfully');
      refetch(); // Refresh categories after deletion
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (id: string) => {
    toast.info('Edit category feature coming soon');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error loading categories</Typography>;
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>

        {/* Add Category Button */}
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
      </Box>

      <Grid container spacing={3}>
        {data?.map((category: any) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography color="textSecondary">{category.description}</Typography>

                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    {/* View Button with next/link */}
                    <Tooltip title="View Category" arrow>
                      <Link href={`/dashboard/utilities/categories/${category._id}`} passHref>
                        <Button
                          variant="outlined"
                          startIcon={<IconEye />}
                        >
                          View
                        </Button>
                      </Link>
                    </Tooltip>

                    {/* Edit Icon with Tooltip */}
                    <Tooltip title="Edit Category" arrow>
                      <IconButton onClick={() => handleEdit(category._id)}>
                        <IconEdit />
                      </IconButton>
                    </Tooltip>

                    {/* Delete Icon with Tooltip */}
                    <Tooltip title="Delete Category" arrow>
                      <IconButton onClick={() => handleDelete(category._id)}>
                        <IconTrash />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
