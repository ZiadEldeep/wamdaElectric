// components/LandingPage.tsx
"use client";
import React, { useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import BuyModal from "./BuyModal";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { ProductFormData } from "./forms/AddProduct";
import { getPriceByRole } from "@/hooks/role";
import { Avatar, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";





SwiperCore.use([Autoplay, Pagination, Navigation]);

const LandingPage= ({products,type}:{products:ProductFormData[],type:string}) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section id="products" className="py-16 px-4">
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          className="pb-8"
          breakpoints={{
            // When window width is >= 1024px (lg)
            1024: {
              slidesPerView: 4,
            },
            // When window width is >= 768px (md)
            768: {
              slidesPerView: 2,
            },
            // When window width is < 768px (sm)
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center space-y-4">
               <Grid item xs={12} md={4} lg={3} key={product.barcode}>
          <BlankCard>
            <Tooltip title="Click to view product details" arrow>
              <Typography component={Link} href={`/products/${product._id}`}>
                <Avatar
                  src={product.productImage}  // Use productImage instead of photo
                  variant="square"
                  sx={{
                    height: 250,
                    width: '100%',
                  }}
                />
              </Typography>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Tooltip title={`Product Name: ${product.itemName}`} arrow>
                <Typography variant="h6">{product.itemName}</Typography>
              </Tooltip>

              <Tooltip title={`Category: ${product.categoryName}`} arrow>
                <Typography variant="body2" color="textSecondary">Category: {product.categoryName}</Typography>
              </Tooltip>

              <Tooltip title={`Unit: ${product.unit}`} arrow>
                <Typography variant="body2" color="textSecondary">Unit: {product.unit}</Typography>
              </Tooltip>

              <Stack direction="column" spacing={1} mt={2}>
              
                  <Tooltip title={`Price: $${getPriceByRole(type, product)}`} arrow>
                    <Typography variant="body2" color="textSecondary">Price: ${getPriceByRole(type, product)}</Typography>
                  </Tooltip>

              </Stack>

              {/* Rating */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Rating name="read-only" size="small" value={product.rating} readOnly />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
};

export default LandingPage;
