import { CONFIG } from '../config';
import { DemoApi } from './demoApi';

class RealApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _makeRequest(url, params) {
    return fetch(url, params)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({ status: res.status, statusText: res.statusText })
      )
      .catch((error) => Promise.reject(error));
  }

  checkSession() {
    const url = this._baseUrl + "/auth.php?check";
    const params = {
      method: "GET",
      credentials: "include",
    };
    return this._makeRequest(url, params);
  }

  findPersonQuick(fam) {
    if (!fam || fam.length < 3) return Promise.resolve([]);
    const url = this._baseUrl + "/person.php?quickfio=" + fam;
    const params = {
      method: "GET",
      credentials: "include",
    };
    return this._makeRequest(url, params);
  }

  findFamQuick(fam) {
    if (!fam || fam.length < 3) return Promise.resolve([]);
    const url = this._baseUrl + "/person.php?quick=" + fam;
    const params = {
      method: "GET",
      credentials: "include",
    };
    return this._makeRequest(url, params);
  }


  findPersonsList(fam, year1 = "", year2 = "") {
    const url = `${this._baseUrl}/card.php?fam=${fam}&year1=${year1}&year2=${year2}`;
    const params = {
      method: "GET",
      credentials: "include",
    };
    return this._makeRequest(url, params);
  }

  insertRecord(obj) {
    const url = this._baseUrl + "/card.php";
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(obj),
    };
    return this._makeRequest(url, params);
  }

  findByNsyst(nsyst) {
    const url = this._baseUrl + "/card.php?nsyst=" + nsyst;
    const params = {
      method: "GET",
      credentials: "include",
    };
    return this._makeRequest(url, params);
  }
}

export const api = (CONFIG.baseUrl || 'demo') === 'demo'
  ? new DemoApi()
  : new RealApi(CONFIG.baseUrl || 'demo');
