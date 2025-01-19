import "./Login.scss";

const LoginCom = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="login">
      <form className="login__form" onSubmit={onSubmit}>
        <h2 className="login__title">Login</h2>
        {error && <p className="login__error">{error}</p>}
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <input
          type="password"
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginCom;
