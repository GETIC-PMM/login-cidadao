import React from "react";
import Keycloak from "keycloak-js";
import keyCloackConfig from "../../keycloak.json";
import { useNavigate } from "react-router-dom";

function Auth() {
  // get query param service
  const queryParams = React.useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const [state, setState] = React.useState({
    token: null,
    isLoading: true,
    user: null,
    loginService: queryParams.get("service") || "keycloak",
    services: [],
  });

  const navigate = useNavigate();

  console.log("Auth state:", state);

  React.useEffect(() => {
    const action = queryParams.get("action");

    if (action === "logout") {
      localStorage.removeItem("token");
      const kc = new Keycloak(keyCloackConfig);
      kc.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
      });
      kc.logout({
        redirectUri: window.location.origin + "/login",
      });
      return;
    } else if (!state.user) {
      // redirect to login page
      //   navigate("/login");
    }
  }, [navigate, queryParams, state.user]);

  // Custom function to check login status via Keycloak
  React.useEffect(() => {
    console.log("Login service:", state.loginService);

    // não usar o serviço de login caso a rota seja action=logout
    const action = queryParams.get("action");
    if (action === "logout") {
      console.log("Logout action detected, skipping login check.");
      return;
    }

    if (state.loginService === "keycloak") {
      console.log("Initializing Keycloak...");
      const kc = new Keycloak(keyCloackConfig);
      kc.init({ onLoad: "check-sso", checkLoginIframe: false })
        .then((authenticated) => {
          if (authenticated) {
            setState((prevState) => ({
              ...prevState,
              isLoading: false,
              user: kc.tokenParsed,
              services: kc.realmAccess.roles,
            }));
            localStorage.setItem("token", kc.token);
            navigate("/home");
          } else {
            setState((prevState) => ({
              ...prevState,
              isLoading: false,
              user: null,
              services: [],
            }));
            console.log("Not authenticated via Keycloak");
            kc.login({
              redirectUri: window.location.origin + "/auth?service=keycloak",
            });
          }
        })
        .catch((error) => {
          console.error("Keycloak initialization failed:", error);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            user: null,
            services: [],
          }));
          navigate("/login");
        });
    } else if (state.loginService === "govbr") {
      // implementar login gov.br aqui
      console.log("teste govbr");
      const kc = new Keycloak(keyCloackConfig);

      // create broker router for gov.br login     http://<keycloak-server>/realms/<your-realm>/protocol/openid-connect/auth?client_id=<your-client-id>&redirect_uri=<your-redirect-uri>&response_type=code&kc_idp_hint=<idp-alias>
      const url = `${keyCloackConfig["auth-server-url"]}realms/${keyCloackConfig["realm"]}/protocol/openid-connect/auth?client_id=${keyCloackConfig["clientId"]}&redirect_uri=${window.location.origin}/auth?service=govbr&response_type=code&kc_idp_hint=keycloak-oidc`;
      kc.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        url: url,
      })
        .then((authenticated) => {
          if (authenticated) {
            setState((prevState) => ({
              ...prevState,
              isLoading: false,
              user: kc.tokenParsed,
              services: kc.realmAccess.roles,
            }));
            localStorage.setItem("token", kc.token);
            console.log("Authenticated via gov.br:", kc.tokenParsed);
            navigate("/home");
          } else {
            setState((prevState) => ({
              ...prevState,
              isLoading: false,
              user: null,
              services: [],
            }));

            console.log("Not authenticated");
            // Redirect to gov.br login page
            // window.location.href = url;

            window.location.href = url;
            // console.log("Redirecting to gov.br login page", url);
          }
        })
        .catch((error) => {
          console.error("Keycloak initialization failed:", error);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            user: null,
            services: [],
          }));
          //   navigate("/login");
        });
    }
  }, [navigate, queryParams, state.loginService]);

  return <div>Aguarde enquanto verificamos suas credenciais...</div>;
}

export default Auth;
