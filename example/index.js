const { createSDK } = require('../');

const DashScopeAPI = createSDK({
  accessToken: process.env.DASHSCOPE_TOKEN,
});

const streamSample = async () => {
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
    const { done, events } = await result.read();

    if (done) {
      return;
    }

    const text = (events || [])
      .map((event) => event.data?.output?.text)
      .join('');
    process.stdout.write(text);
  }
};

const eventStreamSample = async () => {
  const result = await DashScopeAPI.chat.streamCompletion.request(
    {},
    {
      model: 'qwen-plus',
      input: {
        messages: [
          {
            content: '通义千问是什么？请详细回答',
            role: 'user',
          },
        ],
      },
      parameters: {
        incremental_output: true,
      },
    }
  );

  return new Promise((resolve, reject) => {
    result.body.on('data', (chunk) => {
      const decoder = new TextDecoder('utf-8');
      const decodeValue = decoder.decode(chunk);
      const lines = (decodeValue?.split('\n') || []).filter((id) => id);

      const event = {};
      lines.forEach((line) => {
        if (line.includes(':')) {
          const sepIndex = line.indexOf(':');
          const key = line.slice(0, sepIndex);
          const value = line.slice(sepIndex + 1);

          if (key === 'data') {
            try {
              event[key] = JSON.parse(value);
            } catch (e) {}
          } else if (key) {
            event[key] = value;
          }
        }
      });
      process.stdout.write(event.data?.output?.text);
    });
    result.body.on('close', () => {
      resolve();
    });
  });
};

const normalSample = async () => {
  const result = await DashScopeAPI.chat.completion.request(
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
    }
  );

  process.stdout.write(result?.output?.text || '');
};

const main = async () => {
  console.log('普通示例，一次性请求:');
  await normalSample();
  console.log('流式示例:');
  await streamSample();
  console.log('事件流示例:');
  await eventStreamSample();
};

main();
