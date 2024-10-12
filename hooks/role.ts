import { ProductFormData } from "@/components/forms/AddProduct";

export const getPriceByRole = (role:string,prices:ProductFormData) => {
    switch (role) {
      case 'wholesale1':
        return prices.wholesale1;
      case 'wholesale2':
        return prices.wholesale2;
      case 'exhibitSalePrice':
        return prices.exhibitSalePrice;
      default:
        return prices.websiteSalePrice
    }
  };
  

 export const getTypePriceByRole = (role: string) => {
    switch (role) {
      case 'wholesale1':
        return 'wholesale1';
      case 'wholesale2':
        return 'wholesale2';
      case 'retail':
        return 'exhibitSalePrice';
      case 'admin':
        return 'admin';
      default:
        return "websiteSalePrice";
    }
  };
  