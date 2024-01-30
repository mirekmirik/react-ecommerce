import { CSSProperties } from "react";

const NotProducts = () => {
  const styles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    fontSize: 36,
    fontWeight: 900,
    textAlign: "center",
    width: '100%'
  };

  return (
    <div style={styles}>
      <h1>Sorry, there are no products!</h1>
    </div>
  );
};

export default NotProducts;
