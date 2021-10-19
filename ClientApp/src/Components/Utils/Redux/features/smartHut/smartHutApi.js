import axios, { AxiosResponse } from "axios";
import { SmartHut } from "../../../../types";
import { loginRequest, msalInstance } from "../../../msal/msalConfigs";


const setBaseURL = () => {
  axios.defaults.baseURL = 'https://api.smarthut.se';
}

const setToken = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account
  });

  axios.defaults.headers.common['authorization'] = `Bearer ${response.accessToken}`;
}

const configAxios = () => {
  if (!axios.defaults.baseURL) {
    setBaseURL();
  }
  if (!axios.defaults.headers.common['authorization']) {
    setToken();
  }
}

export const getBuildingAndDevices: (id: string) => SmartHut.getBuildingAndDevicesData = async (id) => {

  configAxios();

  console.log(axios.defaults.baseURL, axios.defaults.headers.common['authorization'])

  const data = await axios.get(`/BuildingInfo/${id}/true`)
    .then((res: AxiosResponse<SmartHut.getBuildingAndDevicesData>) => res.data)
    .catch((error) => {
      console.log(error)
    })

  return data;

}