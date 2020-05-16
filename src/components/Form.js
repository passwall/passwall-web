import React from "react";
import { useForm } from "react-hook-form";

function Form() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [master_password, setMasterPassword] = React.useState("");
    const [master_password_verify, setMasterPasswordVerify] = React.useState("");

    console.log(`
        Name: ${name}
        Email: ${email}
        MasterPassword: ${master_password}
        MasterPasswordVerify: ${master_password_verify}
    `);

    // const handleSubmit = (event) => {
    // console.log(`
    //     Name: ${name}
    //     Email: ${email}
    //     MasterPassword: ${master_password}
    //     MasterPasswordVerify: ${master_password_verify}
    // `);
    
    // event.preventDefault(); 
    // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Full Name
            <input
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="John Doe"
            ref={register({ required: true })}
            />
            {errors.name && <span class="error">This field is required</span>}
        </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          ref={register({ required: true })}
          placeholder="hello@passwall.io"
          />
          {errors.email && <span class="error">This field is required</span>}
      </label>
      
      <label>
        Master Password
        <input
          name="master_password"
          type="password"
          value={master_password}
          onChange={e => setMasterPassword(e.target.value)}
          ref={register({ required: true, minLength: 6 })}
          />
          {errors.master_password?.type === "minLength" && <span class="error">Master Password should be at least 6 characters</span>}
          {errors.master_password?.type === "required" && <span class="error">This field is required</span>}
      </label>

      <label>
        Master Password Verify
        <input
          name="master_password_verify"
          type="password"
          value={master_password_verify}
          onChange={e => setMasterPasswordVerify(e.target.value)}
          ref={register({ required: true, minLength: 6 })}
          />
          
          {errors.master_password_verify?.type === "minLength" && <span class="error">Master Password Verify should be at least 6 characters</span>}
          {errors.master_password_verify?.type === "required" && <span class="error">This field is required</span>}
      </label>

      <button>Create My Account</button>
    </form>
  );
}

export default Form;