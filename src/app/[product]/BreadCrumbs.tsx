import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import style from './product.module.css'

const BreadCrumbs = ({name}:{name:string}) => {
  return (
    <div className="max-w-[1440px] h-[100px] mx-[auto] flex items-center bg-[#F9F1E7] pl-[20px]">
          <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className={`${style.BreadCrumbsName}`}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator children={undefined} className={undefined} />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/Shop" className={`${style.BreadCrumbsName}`}>Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator children={undefined} className={undefined} />
                <BreadcrumbItem className={`${style.ProductName}`}>
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
      </div>
  )
}


export default BreadCrumbs