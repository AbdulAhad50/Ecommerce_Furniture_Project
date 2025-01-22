import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage, // If this component should display the final breadcrumb item
} from "@/components/ui/breadcrumb";
import style from './product.module.css';

const BreadCrumbs = ({ name }: { name: string }) => {
  return (
    <div className="max-w-[1440px] h-[100px] mx-[auto] flex items-center bg-[#F9F1E7] pl-[20px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className={`${style.BreadCrumbsName}`}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/Shop" className={`${style.BreadCrumbsName}`}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className={`${style.ProductName}`}>
             <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
         </BreadcrumbList> 
    </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
