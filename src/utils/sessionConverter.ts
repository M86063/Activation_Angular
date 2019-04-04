import { INoneProvisionedSession } from './NoneProvisionedSession';
import { IProvisionedSession } from './ProvisionedSession';

export const sessionConverter = (data: any) => {
  if (data.accessnet) {
    return new ProvisionedSession(data);
  } else {
    return new NoneProvisionedSession(data);
  }
};

export class ProvisionedSession {
  public session: IProvisionedSession;
  constructor(data: IProvisionedSession) {
    this.session = {
      ...data
    };
  }
}

export class NoneProvisionedSession {
  public session: INoneProvisionedSession;
  constructor(data: INoneProvisionedSession) {
    this.session = {
      ...data
    };
  }
}
