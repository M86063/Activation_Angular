import { Next, Subscriber, SiteConfig } from './ProvisionedSession';

export interface INoneProvisionedSession {
  session: string;
  youseeScope: boolean;
  finallink: string;
  subscriber: Subscriber;
  siteconfig: SiteConfig;
  accessnet?: AccessNet[];
  activecomputer: ActiveComputer;
  next: Next;
  forgotpassword: Next;
}

export interface AccessNet {
  deviceType: string;
  macAddress: string;
  ip?: string;
  model?: string;
  capabilities?: NoneProvisionedSessionCapabilities;
}

export interface NoneProvisionedSessionCapabilities {
  model: string;
  oidssid: string;
  oidssid5g: string;
  oidpsk: string;
  oidpsk5g: string;
  WiFi5GChannels: string[];
  WiFiChannels: string[];
  WiFi5G: boolean;
  Docsis3: boolean;
  WiFi: boolean;
  Voice: boolean;
  CMTemplate: boolean;
  Preloaded: string;
  FactoryResetOID: string;
  truth_value: string;
  reboot_time_first_provisioning: string;
  system_description: string;
  system_name: string;
  mta_fqdn: string;
  mta_mac: string;
  oidbts: string;
  oidstatus: string;
  oidprov: string;
  act_portal_system_name: string;
  mac_offset: string;
}

export interface ActiveComputer {
  deviceType: string;
  macAddress: string;
  ip: string;
  giAddress: string;
  docsis3Capable: boolean;
  wifiCapable: boolean;
  ownerid: string;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

export interface Forgotpassword {
  site: string;
  uri: string;
  http: string;
}
