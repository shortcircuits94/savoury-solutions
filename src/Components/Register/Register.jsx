import "./Register.scss";

const Register = ({ formData, error, onInputChange, onSubmit }) => {
  return (
    <div className="register">
      <form className="register__form" onSubmit={onSubmit}>
        <h2 className="register__title">Register</h2>
        {error && <p className="register__error">{error}</p>}
        <input
          type="text"
          name="name"
          className="register__input"
          placeholder="Name"
          value={formData.name}
          onChange={onInputChange}
          required
        />
        <input
          type="email"
          name="email"
          className="register__input"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
          required
        />
        <input
          type="password"
          name="password"
          className="register__input"
          placeholder="Password"
          value={formData.password}
          onChange={onInputChange}
          required
        />
        <button type="submit" className="register__button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
