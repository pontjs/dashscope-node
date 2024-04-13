type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

export namespace defs {
  export type CompletionBody = {
    input?: {
      messages?: Array<{
        /** 消息内容 */
        content?: string;
        /** 消息角色 */
        role?: 'system' | 'user' | 'assistant' | 'tool' }> };
    /** 指定用于对话的通义千问模型名 */
    model?: 'qwen-turbo' | 'qwen-plus' | 'qwen-max' | 'qwen-max-0403' | 'qwen-max-0107' | 'qwen-max-1201' | 'qwen-max-longcontext';
    parameters?: {
      /** 是否启用互联网搜索 */
      enable_search?: boolean;
      /** 是否使用增量输出模式 */
      incremental_output?: boolean;
      /** 生成token的最大数量 */
      max_tokens?: number;
      /** 重复度控制 */
      repetition_penalty?: number;
      /** 输出格式 */
      result_format?: 'text' | 'message';
      /** 随机数种子 */
      seed?: number;
      /** 停止生成的字符串或token_ids */
      stop?: Array<string>;
      /** 随机性和多样性控制 */
      temperature?: number;
      tools?: Array<{
        function?: {
          description?: string;
          name?: string;
          /** function参数描述 */
          parameters?: object };
        type?: 'function' }>;
      /** 采样候选集的大小 */
      top_k?: number;
      /** 核采样方法概率阈值 */
      top_p?: number };
  }

  export type CompletionResponse = {
    output?: {
      choices?: Array<{
        finish_reason?: string;
        message?: {
          content?: string;
          role?: string };
        tool_calls?: Array<{
          function?: {
            arguments?: string;
            name?: string } }> }>;
      finish_reason?: string;
      text?: string };
    request_id?: string;
    usage?: {
      input_tokens?: number;
      output_tokens?: number };
  }
}

export namespace API {
    export namespace chat {
    /**
     * POST /api/v1/services/aigc/text-generation/generation
     */
    export namespace completion {
      export type Params = {
        /** 启用SSE响应，可选值text/event-stream */
        enable?: string;
      };
      export type method = 'POST';
      export type bodyParams = defs.CompletionBody;
      export type APIResponse = defs.CompletionResponse;
    }

    /**
     * POST /api/v1/services/aigc/text-generation/generation
     */
    export namespace streamCompletion {
      export type Params = {
        /** 启用SSE响应，可选值text/event-stream */
        enable?: string;
      };
      export type method = 'POST';
      export type bodyParams = defs.CompletionBody;
      export type APIResponse = defs.CompletionResponse;
    }
  }
}
