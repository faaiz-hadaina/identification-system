const Navbar = (props) => {
  return (
    <header className="page_header header_white toggler_right">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 display_table">
            <div className="header_left_logo display_table_cell">
              {" "}
              <a href="./" className="logo logo_with_text">
                <h2>Verificate</h2></a>{" "}
            </div>
            <div className="header_mainmenu display_table_cell text-right">
              {/* main nav start */}
              <nav className="mainmenu_wrapper">
                <ul className="mainmenu nav sf-menu">
                  <li className="active">
                    {" "}
                    <a href="">Home</a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">DETAILS</a>
                    <ul>
                      {/* features */}
                      <li>
                        {" "}
                        <a href="#">
                          Balance:{props.balance} cUSD
                        </a>

                      </li>
                    </ul>
                  </li>




                </ul>
              </nav>
              {/* eof main nav */}
              {/* header toggler */}
              <span className="toggle_menu">
                <span />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
