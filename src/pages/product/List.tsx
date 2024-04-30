import { PageTitle } from "@/components/common/PageTItle";

export const ProductList = () => {
  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title="NEW ITEMS" alignLeft />
      {/* <div className="productsWrap max-w-4xl mt-11 mx-auto">
       {data?.pages &&
          data?.pages.flatMap((page) =>
            page.products.map((product) => (
              <ProductListItem
                key={product.uid}
                data={product}
                onEdit={() =>
                  moveEditProduct(product.uid, {
                    state: {
                      product,
                    },
                  })
                }
                onDelete={() => handleDeleteClick(product.uid)}
              />
            ))
          )}
        <div ref={hasNextPage ? ref : undefined} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div> */}
    </section>
  );
};
