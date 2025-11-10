import "./carts.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const Carts = ({ carts, setCarts }) => {
  return (
    <>
      <div className="carts-itemps-container">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src="./public/images/150x150.png" />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
     <h4 className="p-3 ">
  <span className="text-primary fw-bold">Items:</span>{" "}
  <span className="text-dark">{carts.length}</span>{" "}
  <span className="text-secondary">item</span> —{" "}
  <span className="text-success fw-bold">Total Price:</span>{" "}
  <span className="text-danger fw-bold">
    ${carts
      .reduce((prev, cart) => prev + cart.price, 0)
      .toFixed(2)}
  </span>
</h4>

      <button className="btn btn-primary btn-lg mt-3">
  🛍️ Checkout
</button>
    </>
  );
};
export default Carts;
