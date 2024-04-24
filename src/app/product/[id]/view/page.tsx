// const { PRODUCTS } = require("../../../lib/placeholder-data.js");
import { fetchProductsById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import ViewProduct from "@/app/ui/product/view-product";
// import Breadcrumbs from "@/app/ui/product/breadcrumbs";

export default async function Page({ params }: { params: { id: string } }) {

  const productId = params.id;
  const product = await fetchProductsById(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/" },
          {
            label: `${product.product_name}`,
            href: `/`,
            active: true,
          },
        ]}
      /> */}
      <ViewProduct product={product} />
    </>
  );
}
