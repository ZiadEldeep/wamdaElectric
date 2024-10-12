'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/lib/schemas/userSchema'; // استيراد مخطط التحقق
import { TextField, Button, MenuItem, Container, Box, Tooltip } from '@mui/material';
import { IconUserPlus } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { addUser } from '@/lib/actions/user.action';

const AddUserPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await addUser(data);
  
      if (result?.success) {
        toast.success(result.message); // عرض رسالة النجاح
        reset(); // إعادة تعيين النموذج بعد الإرسال
      } else {
        toast.error(result?.message || 'Failed to add user.'); // عرض رسالة الخطأ
      }
    } catch (error) {
      toast.error('An error occurred while adding user.');
    }
  };
  

  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 500,
          mx: 'auto',
          p: 3,
          boxShadow: 3,
        }}
      >
        <h2>Add New User</h2>

        <Tooltip title="Enter the user's full name" arrow>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Enter a valid email address" arrow>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Enter a strong password" arrow>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Select the user's role" arrow>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Role"
                select
                error={!!errors.role}
                helperText={errors.role?.message}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="admin">Admin (ادمن)</MenuItem>
                <MenuItem value="wholesale1">Wholesale 1 (جملة ١)</MenuItem>
                <MenuItem value="wholesale2">Wholesale 2 (جملة ٢)</MenuItem>
                <MenuItem value="retail">Retail (تجزئه)</MenuItem>
              </TextField>
            )}
          />
        </Tooltip>

        <Tooltip title="Click to add the user" arrow>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{ mt: 2 }}
          >
            Add User
          </Button>
        </Tooltip>

        <ToastContainer />
      </Box>
    </Container>
  );
};

export default AddUserPage;
