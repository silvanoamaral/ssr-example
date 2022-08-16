import React from "react";
import "./App.css";

function App() {
  const handleOnClick = async () => {
    // 1 criptografa
    // 2 envia os dados para /payment

    const url = "http://localhost:8000/payment";

    const data = {
      name: "Silvano",
      state: "Sao Paulo",
    };

    const payload = new URLSearchParams(data);

    const response = await fetch(url, {
      method: "post",
      body: payload,
    });

    console.log({ response });
  };

  return (
    <div className="form-container">
      <div className="field-container">
        <label htmlFor="name">Nome</label>
        <input id="name" maxLength="20" type="text" />
      </div>
      <div className="field-container">
        <label htmlFor="cardnumber">Número do cartão</label>
        <input
          id="cardnumber"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
        />
      </div>
      <div className="field-container">
        <label htmlFor="expirationdate">Expiração (mm/yy)</label>
        <input
          id="expirationdate"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
        />
      </div>
      <div className="field-container">
        <label htmlFor="securitycode">Código de segurança</label>
        <input
          id="securitycode"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
        />
      </div>

      <button onClick={handleOnClick}>subscribe</button>
    </div>
  );
}

export default App;
