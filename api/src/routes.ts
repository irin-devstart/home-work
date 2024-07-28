import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as controllers from './controllers';

class RouterServer extends Server {
  public constructor() {
    super(true);
    this.configureMiddlewares();
    this.setupControllers();
  }

  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      // eslint-disable-next-line
      const controller = (controllers as any)[name];
      if (typeof controller === 'function') {
        controllerInstances.push(new controller());
      }
    }
    super.addControllers(controllerInstances);
  }

  private async configureMiddlewares(): Promise<void> {
    // NOTE for dev
    // const corsOption = {
    //   origin: process.env.CORS_WHITELIST_ORIGIN,
    //   allowMethods: process.env.CORS_WHITELIST_ALLOW_METHODS,
    //   allowHeaders: process.env.CORS_WHITELIST_ALLOW_HEADERS
    // };

    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  public start(port?: number): void {
    this.app.listen(port, () => {
      console.log(`Apps is initialised port ${port}`);
    });
  }
}

export default RouterServer;
