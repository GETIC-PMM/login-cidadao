import { ArrowRightIcon, Users2Icon, AppleIcon, PlayIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoFooter from "../assets/img/logo-footer.svg";
import useCheckLogin from "../services/checkLogin";

function IndexPage() {
  const state = useCheckLogin();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!state.isLoading && !state.user) {
      navigate("/login");
    }

    console.log(state);
  }, [state.isLoading, state.user, navigate, state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {state.isLoading && (
        //loading overlay on all page
        <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-gray-100 ">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-3"></div>
          <div className="text-dark">Carregando...</div>
        </div>
      )}

      {/* Header */}
      <section className="bg-[url('https://sso.mossoro.rn.gov.br/resources/ijxpt/login/pmm.theme/img/bg-login.jpg')] bg-cover bg-center text-white py-12 text-center shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow">
            Nossos Serviços
          </h1>
        </div>
      </section>

      {/* Bem-vindo */}
      <section className="pt-10 pb-5 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold">
            Bem-vindo,{" "}
            <strong className="capitalize">
              {state.user ? state.user.name : "Visitante"}
            </strong>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm ms-2 hover:bg-red-700 transition"
              onClick={() => {
                // keycloak logout
                window.location.href = "/auth?action=logout";
              }}
            >
              Sair
            </button>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Explore nossos serviços digitais para facilitar sua vida na cidade
            de Mossoró.
          </p>
        </div>
      </section>

      {/* Categoria Cidadão */}
      <section className="pb-10 min-h-[400px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-blue-800 bg-blue-100 font-semibold">
              <Users2Icon />
              <span>Cidadão</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Serviço 1 */}
            <div className="bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-xl transition-all">
              <a
                href="#"
                className="flex flex-col justify-between h-full p-4 text-gray-800"
              >
                <h5 className="text-center text-lg font-semibold mb-4">
                  Jovem do futuro
                </h5>
                <div className="text-right">
                  <button className="btn-primary text-sm inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">
                    <ArrowRightIcon /> Acessar
                  </button>
                </div>
              </a>
            </div>

            {/* Serviço 2 */}
            <div className="bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-xl transition-all">
              <a
                href="#"
                className="flex flex-col justify-between h-full p-4 text-gray-800"
              >
                <h5 className="text-center text-lg font-semibold mb-4">
                  Painel de Empregos
                </h5>
                <div className="text-right">
                  <button className="btn-primary text-sm inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">
                    <ArrowRightIcon /> Acessar
                  </button>
                </div>
              </a>
            </div>

            {/* Serviço 3 */}
            <div className="bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-xl transition-all">
              <a
                href="#"
                className="flex flex-col justify-between h-full p-4 text-gray-800"
              >
                <h5 className="text-center text-lg font-semibold mb-4">
                  App Mossoró Digital
                </h5>
                <div className="flex flex-wrap gap-2 justify-end">
                  <button className="btn-secondary text-sm inline-flex items-center gap-2 bg-gray-400 text-white px-3 py-1.5 rounded hover:bg-gray-500">
                    <PlayIcon /> Google Play
                  </button>
                  <button className="btn-secondary text-sm inline-flex items-center gap-2 bg-gray-400 text-white px-3 py-1.5 rounded hover:bg-gray-500">
                    <AppleIcon /> Apple Store
                  </button>
                  <button className="btn-primary text-sm inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500">
                    <ArrowRightIcon /> Acessar
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <img src={logoFooter} alt="Logo PMM" className="mx-auto" />
          </div>

          <p className="text-xl opacity-80 mb-6">
            Entre em contato conosco para mais informações sobre nossos
            serviços.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition">
              Atendimento
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndexPage;
