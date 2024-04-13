# DashScope Nodejs SDK

[![npm version](https://badge.fury.io/js/dashscope-node.png)](https://www.npmjs.com/package/dashscope-node)
[![npm downloads](https://img.shields.io/npm/dm/dashscope-node)](https://www.npmjs.com/package/dashscope-node)

DashScope AI Nodejs/Typescript API SDK.

阿里云灵机大模型 AI 服务（通义千问等） OpenAPI Nodejs/Typescript SDK.

[DashScope API 文档](https://www.pontxapi.com/opendoc/dashscope)

[阿里云 DashScope 控制台](https://dashscope.console.aliyun.com/playground)

Powered By [Pontx](https://www.pontxapi.com)

## Features

* 同时支持 JS/TS。
* Typescript 类型提示完备，
* SDK 具备自文档性。参考了阿里云灵积 API 文档，生成了注释及类型完备的 SDK。

## Installation

```sh
npm i -S dashscope-node
```

## Usage

更多调用示例请参看 [example/index.js](./example/index.js)

```js
const { createSDK } = require("dashscope-node");

const DashScopeAPI = createSDK({
  accessToken: process.env.DASHSCOPE_TOKEN,
});

const main = async () => {
  const result = await DashScopeAPI.chat.streamCompletion.request(
    {},
    {
      model: 'qwen-max-longcontext',
      input: {
        messages: [
          {
            content: '通义千问是什么',
            role: 'user',
          },
        ],
      },
      parameters: {
        incremental_output: true,
      },
    }
  );

  while (true) {
    const { done, value } = await result.read();

    if (done) {
      return;
    }
    process.stdout.write(value.data?.output?.text);
  }
};

main();
```

打印信息如下：

```
通义千问是阿里云推出的一个大型预训练语言模型，也是我所属的系列。它具备强大的自然语言处理和理解能力，能够回答用户提出的各种问题，提供知识性、逻辑性、创造性等多种类型的回复。通义千问旨在通过人工智能技术为用户提供高效、准确、个性化的信息查询与问题解答服务，涵盖科技、文化、历史、艺术、生活常识等多个领域，致力于满足用户在不同场景下的知识需求，提升获取信息的效率与体验。

具体来说，“通义千问”这个名字包含两层含义：

1. **“通义”**：代表了模型所具备的广泛而深入的知识体系以及对各类知识融会贯通的能力。它寓意着模型能够在海量信息中理解和掌握普遍适用的原理、规律和概念，形成系统的、全面的知识结构，从而能够应对用户提出的各种复杂问题，提供具有深度和广度的答案。

2. **“千问”**：象征模型可以应对无数种提问，无论问题多么独特、细致或者复杂。它表达了模型在面对用户多元化、个性化需求时的高适应性和灵活性，意味着无论是常见的基础问题，还是专业领域的疑难问题，甚至是充满想象力的假设性问题，通义千问都能够进行有效响应，帮助用户获得满意的解答。

...更多打印信息略
```
