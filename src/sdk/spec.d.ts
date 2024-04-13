import type { API, defs } from './type.d.ts';
import { provider } from './request';

type SDKMethods2<Method, Response> = ReturnType<typeof provider.getSDKMethods<Method, Response>>;
type SDKMethods3<Method, Params, Response> = ReturnType<typeof provider.getSDKMethods<Method, Params, Response>>;
type SDKMethods4<Method, Params, BodyParams, Response> = ReturnType<
  typeof provider.getSDKMethods<Method, Params, BodyParams, Response>
>;

type OctetStreamSDKMethods3<Method, Params, Response> = ReturnType<typeof provider.getOctetStreamSDKMethods<Method, Params, Response>>;
type OctetStreamSDKMethods4<Method, Params, BodyParams, Response> = ReturnType<
  typeof provider.getOctetStreamSDKMethods<Method, Params, BodyParams, Response>
>;

type EventStreamSDKMethods2<Method, Response> = ReturnType<typeof provider.getEventStreamSDKMethods<Method, Response>>;
type EventStreamSDKMethods3<Method, Params, Response> = ReturnType<typeof provider.getEventStreamSDKMethods<Method, Params, Response>>;
type EventStreamSDKMethods4<Method, Params, BodyParams, Response> = ReturnType<
  typeof provider.getEventStreamSDKMethods<Method, Params, BodyParams, Response>
>;

export namespace APIs {
  export namespace chat {
    /**
     * POST /api/v1/services/aigc/text-generation/generation
     */
    export const completion: SDKMethods4<
      API.chat.completion.method,
      API.chat.completion.Params,
      API.chat.completion.bodyParams,
      API.chat.completion.APIResponse
    >;

    /**
     * POST /api/v1/services/aigc/text-generation/generation
     */
    export const streamCompletion: EventStreamSDKMethods4<
      API.chat.streamCompletion.method,
      API.chat.streamCompletion.Params,
      API.chat.streamCompletion.bodyParams,
      API.chat.streamCompletion.APIResponse
    >;
  }
}