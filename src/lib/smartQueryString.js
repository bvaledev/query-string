const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

export const parseToQueryString = (obj) =>
  Object.entries(obj).map(keyValueToString).join('&');

const parseItemsPart = (item) => {
  let [key, value] = item.split('=');
  if (value.indexOf(',') > -1) {
    value = value.split(',');
  }
  return [key, value];
};

export const parseToObject = (string) =>
  Object.fromEntries(string.split('&').map(parseItemsPart));
