import { useState } from "react";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addProduct(name, summary, image);
  };
  return (
    <section className="ls columns_padding_25 section_padding_top_65 section_padding_bottom_130">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 to_animate" data-animation="scaleAppear">
            <h3>Add Product</h3>
            <form
              onSubmit={handleSubmit}
              className="contact-form row columns_padding_10"
            >
              <div className="col-sm-6">
                <div className="form-group bottommargin_0">
                  {" "}
                  <label htmlFor="name">
                    Name of Product<span className="required">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Name of Product"
                  />{" "}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group bottommargin_0">
                  {" "}
                  <label htmlFor="name">
                    Image of Product<span className="required">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    className="form-control"
                    placeholder="Image of Product"
                  />{" "}
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group bottommargin_0">
                  {" "}
                  <label htmlFor="message">Summary</label>{" "}
                  <textarea
                    rows={5}
                    cols={45}
                    onChange={(e) => setSummary(e.target.value)}
                    className="form-control"
                    placeholder="Describe your product"
                  />{" "}
                </div>
              </div>
              <div className="col-sm-12">
                <div className="contact-form-submit topmargin_10">
                  {" "}
                  <button
                    className="theme_button color4 min_width_button margin_0"
                  >
                    Add now
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*.row */}
      </div>
      {/*.container */}
    </section>
  );
};

export default AddProduct;
