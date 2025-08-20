import React from "react";
import Keycloak from "keycloak-js";
import keyCloackConfig from "../../keycloak.json";

function useCheckLogin() {
  const [state, setState] = React.useState({
    token: null,
    isLoading: true,
    user: null,
    services: [],
    loginService: null,
  });

  // check query string for service parameter
  const queryParams = new URLSearchParams(window.location.search);
  const service = queryParams.get("service");
  if (service) {
    setState((prevState) => ({ ...prevState, loginService: service }));
  }

  React.useEffect(() => {
    if (state.loginService == "keycloak" || !state.loginService) {
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
          } else {
            setState((prevState_1) => ({
              ...prevState_1,
              isLoading: false,
              user: null,
              services: [],
            }));
          }
        })
        .catch((error) => {
          console.error("Keycloak initialization failed:", error);
          setState((prevState_2) => ({
            ...prevState_2,
            isLoading: false,
            user: null,
            services: [],
          }));
        });
    } else {
      // login service via gov.br
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        user: null,
        services: [],
      }));
      console.log("Using login service:", state.loginService);
    }
  }, [state.loginService]);

  return state;
}

export default useCheckLogin;
