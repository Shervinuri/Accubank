export interface Account {
  u: string;
  p: string;
}

export interface ScrapedItem {
  type: 'account' | 'config';
  content: string;
  meta?: string; // For Account: username, For Config: Protocol
  extra?: string; // For Account: password
}

export interface ConfigStats {
  vless: number;
  vmess: number;
  trojan: number;
  ss: number;
  hysteria: number;
  tuic: number;
  accounts: number;
}
