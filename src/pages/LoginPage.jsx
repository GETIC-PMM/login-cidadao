import React from "react";
// import images
import fundo from "../assets/img/fundo.jpg";
import mossoroDigitalLogo from "../assets/img/mossoro-digital-logo.svg";

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoginCredentials = () => {
    setIsLoading(true);
    console.log("Logging in with keycloak...");
    // chama o serviço do keycloak aqui
    setTimeout(() => {
      window.location.href = "/home"; // Redireciona para a página inicial após o login
      // setIsLoading(false);
    }, 2000);
  };

  const handleLoginGovBr = () => {
    setIsLoading(true);
    // Redirect to gov.br login page or handle gov.br login logic
    console.log("Redirecting to gov.br login...");
    setTimeout(() => {
      window.location.href = "/home"; // Redireciona para a página inicial após o login
      // setIsLoading(false);
    }, 2000);
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="flex flex-wrap w-full min-h-[420px] shadow-lg rounded-md overflow-hidden bg-white max-w-[1140px] mx-auto">
        {/* Imagem */}
        <div className="w-full md:w-1/2 flex items-stretch">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://sso.mossoro.rn.gov.br/resources/ijxpt/login/pmm.theme/img/bg-login.jpg')",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-white p-4">
              <img
                src={mossoroDigitalLogo}
                alt="PMM Logo"
                className="mb-3 max-w-[300px]"
              />
              <h1 className="text-lg font-semibold text-center">
                Sistemas Prefeitura de Mossoró
              </h1>
              <p className="text-center text-base">
                Acesse seus serviços e informações de forma rápida e segura.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <svg
              width="42"
              height="49"
              viewBox="0 0 42 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.5 13C28.5 10.375 27 7.9375 24.75 6.53125C22.4062 5.21875 19.5 5.21875 17.25 6.53125C14.9062 7.9375 13.5 10.375 13.5 13C13.5 15.7188 14.9062 18.1562 17.25 19.5625C19.5 20.875 22.4062 20.875 24.75 19.5625C27 18.1562 28.5 15.7188 28.5 13ZM9 13C9 8.78125 11.25 4.84375 15 2.6875C18.6562 0.53125 23.25 0.53125 27 2.6875C30.6562 4.84375 33 8.78125 33 13C33 17.3125 30.6562 21.25 27 23.4062C23.25 25.5625 18.6562 25.5625 15 23.4062C11.25 21.25 9 17.3125 9 13ZM4.59375 44.5H37.3125C36.4688 38.5938 31.4062 34 25.2188 34H16.6875C10.5 34 5.4375 38.5938 4.59375 44.5ZM0 46.2812C0 37 7.40625 29.5 16.6875 29.5H25.2188C34.5 29.5 42 37 42 46.2812C42 47.7812 40.6875 49 39.1875 49H2.71875C1.21875 49 0 47.7812 0 46.2812Z"
                fill="#7b8bb7"
              />
            </svg>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Fazer login</h2>
            <p className="text-gray-500 text-[1.1rem]">
              Faça login com suas credenciais ou pelo <strong>gov.br</strong>
            </p>
          </div>

          {!isLoading ? (
            <>
              <div className="w-full mb-2">
                <a
                  href="#"
                  onClick={() => handleLoginCredentials()}
                  className="block w-full text-white font-bold text-lg rounded-full py-3 text-center bg-gray-400 hover:bg-gray-500 transition"
                >
                  Entrar com Login e Senha
                </a>
              </div>
              <div className="w-full mb-2">
                <a
                  href="#"
                  onClick={() => handleLoginGovBr()}
                  className="block w-full text-white font-bold text-lg rounded-full py-3 text-center bg-blue-700 hover:bg-blue-800 transition"
                >
                  Entrar com <strong>gov.br</strong>
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 mb-4 border-blue-600"></div>
            </div>
          )}

          <div className="text-center text-base text-gray-600 mb-2">
            Se você ainda não tem a sua conta gov.br,
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gov.br/pt-br/servicos/criar-sua-conta-gov.br"
              className="text-blue-600 underline me-1"
            >
              clique aqui
            </a>
            para criá-la.
          </div>

          <div className="text-sm text-gray-400 mt-2">v1.0</div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
