import { createSDK as originCreateSDK } from './sdk/index';

export const createSDK: typeof originCreateSDK = (config) => {
  const sdk = originCreateSDK(config);
  const originRequest = sdk.chat.streamCompletion.request;

  sdk.chat.streamCompletion.request = async (
    params,
    bodyParams,
    fetchOptions
  ) => {
    const options = {
      ...(fetchOptions || {}),
    };
    const headers = {
      ...(options.headers || {}),
      'X-DashScope-SSE': 'enable',
    };
    options.headers = headers;

    return originRequest(params, bodyParams, options);
  };

  return sdk;
};
