function formLogin({ toggleShowLoginForm, handleLoginCredentials }) {
  return (
    <form
      className="flex flex-col items-center w-full"
      id="formLoginCredentials"
      onSubmit={(e) => {
        e.preventDefault();
        handleLoginCredentials({
          email: e.target.email.value,
          password: e.target.password.value,
          rememberMe: e.target.rememberMe.checked,
        });
      }}
    >
      <input
        name="email"
        type="text"
        placeholder="E-mail ou CPF"
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        name="password"
        autoComplete="current-password"
        type="password"
        placeholder="Senha"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div className="flex justify-start mb-4 w-full">
        <div className="flex h-6 items-center">
          <div className="group me-2 relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-blue-600 transition-colors duration-200 ease-in-out has-checked:bg-blue-600 has-focus-visible:outline-2">
            <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
            <input
              id="rememberMe"
              type="checkbox"
              name="rememberMe"
              aria-label="Manter Conectado"
              className="absolute inset-0 appearance-none focus:outline-hidden"
            />
          </div>
        </div>
        <label
          htmlFor="rememberMe"
          className="text-gray-600 me-2 forms-check-label"
        >
          Manter conectado?
        </label>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleShowLoginForm();
          }}
          className="text-blue-600 underline ml-auto"
        >
          Esqueci minha senha
        </a>
      </div>
      <div className="text-sm text-gray-500 mb-2"></div>
      <div className="flex items-center justify-center mb-4 stretch w-full gap-2">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded w-full mb-2"
          onClick={() => {
            toggleShowLoginForm();
          }}
        >
          Retornar
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
          type="submit"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}

export default formLogin;
