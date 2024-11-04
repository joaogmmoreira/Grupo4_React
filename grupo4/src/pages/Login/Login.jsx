export default function Login() {
  return (
    <>
      <div class="container">
        <div>
          <img src="../../assets/react.svg" alt="logo" />
        </div>
        <div>
          <h1>Entre com seu usuário e senha</h1>
        </div>
        <div>
          <form>
            <label>Username:</label>
            <input type="text" name="username" />
          </form>
        </div>
        <p>Entre com seu usuário e senha</p>
      </div>
    </>
  );
}
