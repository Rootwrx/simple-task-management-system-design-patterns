import { TIMEOUT_SEC } from "./config";

const timeout = (s) =>
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} seconds`)),
      s * 1000
    )
  );

const UUID = () => Math.random().toString(36).substr(2, 9);

const getJson = async (url) => {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

const getUrlSearchParam = (query) => {
  const url = new URL(window.location.href);

  if (query) {
    url.searchParams.set("search", query);
    window.history.pushState({}, "", url.href);
    return;
  }
  return url.searchParams.get("search");
};

const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  return element;
};

Element.prototype.get = function (selector) {
  return this.querySelector(selector);
};
Element.prototype.getAll = function (selector) {
  return Array.from(this.querySelectorAll(selector));
};

const get = (selector) => document.querySelector(selector);
const getAll = (selector) => document.querySelectorAll(selector);

export { getJson ,UUID, getUrlSearchParam, createElement, get, getAll };
