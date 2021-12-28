const Products = (props) => {
  const upvoteProduct = (index) => {
    props.upvoteProduct(index);
  };
  const downvoteProduct = (index) => {
    props.downvoteProduct(index);
  };

  return (
    <>
      <section className="ls section_padding_top_150 section_padding_bottom_100 columns_padding_30">
        <div className="container">
          <div className="row">
            <div className="col-sm-7 col-md-12 col-lg-12 ">
              <div className="columns-2">
                <ul id="products" className="products list-unstyled">
                  {props.products.map((product) => (
                    <li className="product type-product loop-color">
                      <article className="vertical-item content-padding rounded overflow_hidden with_background">
                        <div className="item-media">
                          {" "}
                          <img src={product.image} alt="" />{" "}
                          <div className="product-buttons">
                            {" "}
                            <a href="#" onClick={()=>upvoteProduct(product.index)} className="favorite_button">
                              <span className="sr-only">Add to favorite</span>
                            </a>{" "}
                            <a href="#" onClick={()=>downvoteProduct(product.index)} className="add_to_cart"></a>{" "}
                          </div>
                        </div>
                        <div className="item-content">
                          <h4 className="entry-title topmargin_5">
                            {" "}
                            <a href="">{product.name}</a>{" "}
                          </h4>
                          <p className="">
                            {product.summary}
                          </p>
                          <p className="content-3lines-ellipsis">
                            {product.good} user(s) think its good <br />
                            {product.bad} user(s) think its bad
                          </p>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
