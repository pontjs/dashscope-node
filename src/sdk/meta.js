const specMeta = {
  "apis": {
    "chat": {
      "completion": {
        "method": "post",
        "hasBody": true,
        "hasParams": true,
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "apiName": "completion",
        "path": "/api/v1/services/aigc/text-generation/generation",
        "specName": "single",
        "controllerName": "chat"
      },
      "streamCompletion": {
        "method": "post",
        "hasBody": true,
        "hasParams": true,
        "consumes": [
          "application/json"
        ],
        "produces": [
          "text/event-stream"
        ],
        "apiName": "streamCompletion",
        "path": "/api/v1/services/aigc/text-generation/generation",
        "specName": "single",
        "controllerName": "chat"
      }
    }
  },
  "hasController": true,
  "specName": "single",
  "description": "阿里云 DashScope 灵积模型服务 OpenAPI",
  "host": "dashscope.aliyuncs.com",
  "securitySchemes": {
    "ApiKeyAuth": {
      "scheme": "bearer",
      "type": "http"
    }
  },
  "security": [
    {
      "ApiKeyAuth": []
    }
  ]
};
export default specMeta;