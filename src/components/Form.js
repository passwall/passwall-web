import React from "react";

function Form() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [master_password, setMasterPassword] = React.useState("");
    const [master_password_verify, setMasterPasswordVerify] = React.useState("");

  const handleSubmit = (event) => {
    console.log(`
        Name: ${name}
        Email: ${email}
        MasterPassword: ${master_password}
        MasterPasswordVerify: ${master_password_verify}
    `);
    
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Full Name
            <input
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="John Doe"
            required />
        </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="hello@passwall.io"
          required />
      </label>
      
      <label>
        Master Password
        <input
          name="master_password"
          type="password"
          value={master_password}
          onChange={e => setMasterPassword(e.target.value)}
          required />
      </label>

      <label>
        Master Password Verify
        <input
          name="master_password_verify"
          type="password"
          value={master_password_verify}
          onChange={e => setMasterPasswordVerify(e.target.value)}
          required />
      </label>

      <button>Create My Account</button>
    </form>
  );
}

export default Form;