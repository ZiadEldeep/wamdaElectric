import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/lib/schemas/categorySchema'; // استدعاء مخطط Zod للتحقق
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface CategoryFormData {
  name: string;
  description: string;
  products: string[];
}

const CategoryForm = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
const [isSubmitting, setisSubmitting] = useState(false)
  // جلب المنتجات باستخدام useQuery من @tanstack/react-query
  const { data: products, isLoading } = useQuery({queryKey:['products'],queryFn: async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }});

// التعامل مع إرسال النموذج
const onSubmit = (data: CategoryFormData) => {
    try {
        setisSubmitting(true)
        axios.post('/api/categories', data);
        toast.success('Category created successfully!');
        router.push('/dashboard/utilities/categories'); 
        setisSubmitting(false)
    } catch (error) {
        
        toast.error('Error creating category');
        console.error(error);
        setisSubmitting(false)
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Category
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Category Name */}
        <FormControl fullWidth>
          <TextField
            label="Category Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        </FormControl>

        {/* Description */}
        <FormControl fullWidth>
          <TextField
            label="Description"
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        </FormControl>

        {/* Products */}
        <FormControl fullWidth>
          <InputLabel>Products</InputLabel>
          <Controller
            name="products"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                error={!!errors.products}
              >
                {products.map((product: any) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.itemName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<IconPlus />}
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </motion.div>
  );
};

export default CategoryForm;
