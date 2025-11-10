import { Button, Card } from "react-bootstrap";
import "./products.css";
const Products = ({ products , carts, setCarts }) => {
  return (
    <div className="product-itemps-container">
      {products.map((product) => {
        return (
          <Card style={{ width: "18rem" }} key={product.id}>
            <Card.Img variant="top" src="./public/images/150x150.png" />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <b>${product.price.toFixed(2)}</b>
              </Card.Text>

              {carts.find((cart) => cart.id === product.id) ? (
                <span className="badge bg-danger">Adder</span>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setCarts([...carts, product]);
                  }}
                >
                  Add to Carts
                </Button>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;
