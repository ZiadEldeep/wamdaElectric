import React from 'react';
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Stack,
  Avatar
} from "@mui/material";

import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { getPriceByRole } from '@/hooks/role';


// Interface for product data
export interface ProductFormData {
  _id: string;
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  category: string;
  purchasePrice: number;
  rating: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2?: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  productImage: string;
}

// Function to fetch products
const fetchProducts = async () => {
  const response = await fetch('/api/products'); // Adjust the API endpoint as needed
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Blog = ({ products, role }: { products: ProductFormData[], role: string }) => {
  console.log(role)
  return (
    <Grid container spacing={3}>
      {products.map((product: ProductFormData) => (
        <Grid item xs={12} md={4} lg={3} key={product.barcode}>
          <BlankCard>
            <Tooltip title="Click to view product details" arrow>
              <Typography component={Link} href={`${role==="admin"?'/dashboard/utilities':''}/products/${product._id}`}>
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

              {/* Displaying prices based on role */}
              <Stack direction="column" spacing={1} mt={2}>
                {role === 'admin' ? (
                  // If role is admin, show all prices
                  <>
                    <Tooltip title={`Sale Price: $${product.salePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">Sale Price: ${product.salePrice}</Typography>
                    </Tooltip>
                    <Tooltip title={`Wholesale Price 1: $${product.wholesale1}`} arrow>
                      <Typography variant="body2" color="textSecondary">Wholesale 1: ${product.wholesale1}</Typography>
                    </Tooltip>
                    <Tooltip title={`Wholesale Price 2: $${product.wholesale2}`} arrow>
                      <Typography variant="body2" color="textSecondary">Wholesale 2: ${product.wholesale2}</Typography>
                    </Tooltip>
                    <Tooltip title={`Exhibit Sale Price: $${product.exhibitSalePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">Exhibit Sale Price: ${product.exhibitSalePrice}</Typography>
                    </Tooltip>
                    <Tooltip title={`Website Sale Price: $${product.websiteSalePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">Website Sale Price: ${product.websiteSalePrice}</Typography>
                    </Tooltip>
                  </>
                ) : (
                  // For other roles, show the price based on the role
                  <Tooltip title={`Price: $${getPriceByRole(role, product)}`} arrow>
                    <Typography variant="body2" color="textSecondary">Price: ${getPriceByRole(role, product)}</Typography>
                  </Tooltip>
                )}
              </Stack>

              {/* Rating */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Rating name="read-only" size="small" value={product.rating} readOnly />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;

// import React from 'react';
// import Link from "next/link";
// import {
//   CardContent,
//   Typography,
//   Grid,
//   Rating,
//   Tooltip,
//   Stack,

//   Avatar
// } from "@mui/material";

// import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";

// // Interface for product data
// export interface ProductFormData {
//   _id: string;
//   barcode: string;
//   itemName: string;          // Changed from title to itemName
//   unit: string;
//   categoryName: string;
//   category: string;
//   purchasePrice: number;
//   rating: number;
//   salePrice: number;
//   unitCost: number;
//   wholesale1: number;
//   wholesale2: number;
//   unitName2?: string;
//   exhibitSalePrice: number;
//   websiteSalePrice: number;
//   productImage: string;      // Changed from photo to productImage
// }

// // Function to fetch products
// const fetchProducts = async () => {
//   const response = await fetch('/api/products'); // Adjust the API endpoint as needed
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const Blog = ({products}:{products:ProductFormData[]}) => {
 

//   return (
//     <Grid container spacing={3}>
//       {products.map((product: ProductFormData) => (
//         <Grid item xs={12} md={4} lg={3} key={product.barcode}>
//           <BlankCard>
//             <Tooltip title="Click to view product details" arrow>
//               <Typography component={Link} href={`/dashboard/utilities/products/${product._id}`}>
//                 <Avatar
//                   src={product.productImage}  // Use productImage instead of photo
//                   variant="square"
//                   sx={{
//                     height: 250,
//                     width: '100%',
//                   }}
//                 />
//               </Typography>
//             </Tooltip>
//             <CardContent sx={{ p: 3, pt: 2 }}>
//               <Tooltip title={`Product Name: ${product.itemName}`} arrow> 
//                 <Typography variant="h6">{product.itemName}</Typography>
//               </Tooltip>

//               <Tooltip title={`Category: ${product.categoryName}`} arrow>
//                 <Typography variant="body2" color="textSecondary">Category: {product.categoryName}</Typography>
//               </Tooltip>

//               <Tooltip title={`Unit: ${product.unit}`} arrow>
//                 <Typography variant="body2" color="textSecondary">Unit: {product.unit}</Typography>
//               </Tooltip>

//               <Stack direction="column" spacing={1} mt={2}>
//                 {/* Displaying all the prices with tooltips */}
//                 <Tooltip title={`Sale Price: $${product.salePrice}`} arrow>
//                   <Typography variant="body2" color="textSecondary">Sale Price: ${product.salePrice}</Typography>
//                 </Tooltip>

//                 <Tooltip title={`Wholesale Price 1: $${product.wholesale1}`} arrow>
//                   <Typography variant="body2" color="textSecondary">Wholesale 1: ${product.wholesale1}</Typography>
//                 </Tooltip>

//                 <Tooltip title={`Wholesale Price 2: $${product.wholesale2}`} arrow>
//                   <Typography variant="body2" color="textSecondary">Wholesale 2: ${product.wholesale2}</Typography>
//                 </Tooltip>

//                 <Tooltip title={`Exhibit Sale Price: $${product.exhibitSalePrice}`} arrow>
//                   <Typography variant="body2" color="textSecondary">Exhibit Sale Price: ${product.exhibitSalePrice}</Typography>
//                 </Tooltip>

//                 <Tooltip title={`Website Sale Price: $${product.websiteSalePrice}`} arrow>
//                   <Typography variant="body2" color="textSecondary">Website Sale Price: ${product.websiteSalePrice}</Typography>
//                 </Tooltip>
//               </Stack>

//               {/* Rating */}
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
//                 <Rating name="read-only" size="small" value={product.rating} readOnly />
//               </Stack>
//             </CardContent>
//           </BlankCard>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Blog;
