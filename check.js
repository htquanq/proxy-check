import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import fs from 'fs';

const data = fs.readFileSync('proxy.txt', 'utf8');
if (data.length > 0) {
  fs.openSync('proxy.txt', 'w');
}

data.split(/\r?\n/).forEach(proxy =>  {
  console.log(`Kiểm tra proxy ${proxy}`);
  const proxyAgent = new HttpsProxyAgent(proxy);
  const response = axios.get("https://api.ipify.org?format=json", {
    httpsAgent: proxyAgent,
  });
  if (response.status === 200) {
  } else {
    console.log(`Proxy lỗi ${proxy}`);
  }
});
