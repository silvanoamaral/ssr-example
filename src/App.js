import React from "react";
import "./App.css";

const producao = "https://projeto-ssr-example.herokuapp.com/payment";
// const local = "http://localhost:8000/payment";

const enviroment = producao;

function App() {
  const [resellerName, setName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  if (typeof window !== "undefined") {
    console.log(window.location);
  }

  const data = {
    resellerName,
    cardNumber,
    expirationDate,
    cvv,
  };

  const handleOnBlurName = (e) => {
    const name = e.target.value;
    if (name !== undefined && name !== "") {
      setName(name);
    }
  };

  const handleOnBlurCardNumber = (e) => {
    const cardNumberData = e.target.value;
    if (cardNumberData !== undefined && cardNumberData !== "") {
      setCardNumber(cardNumberData);
    }
  };
  const handleOnBlurExpiration = (e) => {
    const expiration = e.target.value;
    if (expiration !== undefined && expiration !== "") {
      setExpirationDate(expiration);
    }
  };

  const handleOnBlurSecurityCode = (e) => {
    const cvvData = e.target.value;
    if (cvvData !== undefined && cvvData !== "") {
      setCvv(cvvData);
    }
  };

  const getPayment = async () => {
    const payload = new URLSearchParams(data);

    return await fetch(enviroment, {
      method: "post",
      body: payload,
    });
  };

  if (resellerName && cardNumber && cvv !== "") {
    getPayment();
  }

  return (
    <div className="form-container">
      <div className="field-container">
        <label htmlFor="name">Nome</label>
        <input id="name" maxLength="20" type="text" onBlur={handleOnBlurName} />
      </div>
      <div className="field-container">
        <label htmlFor="cardnumber">Número do cartão</label>
        <input id="cardnumber" type="text" onBlur={handleOnBlurCardNumber} />
      </div>
      <div className="field-container">
        <label htmlFor="expirationDate">Data de expiração (mm/yy)</label>
        <input
          id="expirationDate"
          type="text"
          onBlur={handleOnBlurExpiration}
        />
      </div>
      <div className="field-container">
        <label htmlFor="securitycode">Código de segurança</label>
        <input
          id="securitycode"
          type="text"
          onBlur={handleOnBlurSecurityCode}
        />
      </div>
    </div>
  );
}

export default App;
