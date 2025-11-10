import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ products, carts, setToken }) => {
  console.log(carts);
  console.log(products);
  return (
    <div>
      <Link to={"/home"}>
        <Button variant="outline-info">Home</Button>
      </Link>
      <Link to={"/calculator"}>
        <Button variant="outline-info">Calculator</Button>
      </Link>
      <Link to={"/animation"}>
        <Button variant="outline-info">Animation</Button>
      </Link>
      <Link to={"/components"}>
        <Button variant="outline-info">Components</Button>
      </Link>
      <Link to={"/Todo"}>
        <Button variant="outline-info">Todo</Button>
      </Link>
      <Link to={"/products"}>
        <Button variant="outline-info">Products ({products.length}) </Button>
      </Link>
      <span className="position-relative">
        <Link to={"/carts"}>
          <Button variant="outline-info" className="position-relative">
            Carts
            {carts.length > 0 && (
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carts.length < 10 ? carts.length : "9+"}
                <span class="visually-hidden">unread messages</span>
              </span>
            )}
          </Button>
        </Link>
      </span>
      <Button
        variant="outline-danger"
        onClick={() => {
          setToken("");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AppNavbar;
