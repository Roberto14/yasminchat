// Code provided by https://www.npmjs.com/package/flashing-page-title-notification
type ConfigType = {
  currentTitle: string,
  interval: number | null,
};
const config: ConfigType = {
  currentTitle: '',
  interval: null,
};

export const on = function (notificationText: string, intervalSpeed?: number) {
  if (!config.interval) {
    config.currentTitle = global.document.title;
    // @ts-ignore
    config.interval = global.setInterval(() => {
      global.document.title = (config.currentTitle === global.document.title)
        ? notificationText
        : config.currentTitle;
    }, (intervalSpeed) || 1000);
  }
};

export const off = function () {
  // @ts-ignore
  global.clearInterval(config.interval);
  config.interval = null;
  global.document.title = config.currentTitle;
};
