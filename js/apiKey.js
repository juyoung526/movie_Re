const encodedKey = "NWQzOTI2Y2ExZTcxYmE3ZDVhZTkyMDRhYjdkMmVhNmE=";

function getApiKey() {
  return atob(encodedKey);
}

export { getApiKey };