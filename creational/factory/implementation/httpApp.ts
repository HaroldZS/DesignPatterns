interface HttpAdapterFactory {
  makeAdapter(): HttpAdapter;
}

class ExpressHttpAdapterFactory implements HttpAdapterFactory {
  makeAdapter() {
    return new ExpressHttpAdapter("express");
  }
}

class FastifyHttpAdapterFactory implements HttpAdapterFactory {
  makeAdapter() {
    return new FastifyHttpAdapter("fastify");
  }
}

class NestJsHttpAdapterFactory implements HttpAdapterFactory {
  makeAdapter() {
    return new NestJsHttpAdapter("nest-js");
  }
}

interface HttpAdapter {
  get(): void;
  post(): void;
  put(): void;
  delete(): void;
}

class ExpressHttpAdapter implements HttpAdapter {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  get() {
    console.log(`${this.type} get implementation`);
  }
  post() {
    console.log(`${this.type} post implementation`);
  }
  put() {
    console.log(`${this.type} put implementation`);
  }
  delete() {
    console.log(`${this.type} delete implementation`);
  }
}

class FastifyHttpAdapter implements HttpAdapter {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  get() {
    console.log(`${this.type} get implementation`);
  }
  post() {
    console.log(`${this.type} post implementation`);
  }
  put() {
    console.log(`${this.type} put implementation`);
  }
  delete() {
    console.log(`${this.type} delete implementation`);
  }
}

class NestJsHttpAdapter implements HttpAdapter {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  get() {
    console.log(`${this.type} get implementation`);
  }
  post() {
    console.log(`${this.type} post implementation`);
  }
  put() {
    console.log(`${this.type} put implementation`);
  }
  delete() {
    console.log(`${this.type} delete implementation`);
  }
}

function appHttpAdapaterFactory(factory: HttpAdapterFactory) {
  const adapter: HttpAdapter = factory.makeAdapter();
  adapter.get();
  adapter.post();
  adapter.put();
  adapter.delete();
}

// appHttpAdapaterFactory(new ExpressHttpAdapterFactory());
// appHttpAdapaterFactory(new FastifyHttpAdapterFactory());
// appHttpAdapaterFactory(new NestJsHttpAdapterFactory());

type HttpAdapterFactoryType = "express" | "fastify" | "nest-js";
function createHttpAdapterFactory(type: HttpAdapterFactoryType) {
  const adapters = {
    express: ExpressHttpAdapterFactory,
    fastify: FastifyHttpAdapterFactory,
    "nest-js": NestJsHttpAdapterFactory,
  };
  const factoryClass = adapters[type];
  return new factoryClass();
}

appHttpAdapaterFactory(createHttpAdapterFactory("express"));
appHttpAdapaterFactory(createHttpAdapterFactory("fastify"));
appHttpAdapaterFactory(createHttpAdapterFactory("nest-js"));