import axios from "axios";

const API = "http://localhost:5001/api/atm";

export function signup(data) {
  return axios.post(`${API}/signup`, data);
}

export function login(accountNumber, pin) {
  return axios.post(`${API}/login`, {
    accountNumber,
    pin,
  });
}

export function getBalance(accountNumber) {
  return axios.get(`${API}/balance/${accountNumber}`);
}

export function deposit(accountNumber, amount) {
  return axios.put(`${API}/deposit`, {
    accountNumber,
    amount,
  });
}

export function withdraw(accountNumber, amount) {
  return axios.put(`${API}/withdraw`, {
    accountNumber,
    amount,
  });
}