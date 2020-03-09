# react-interaction

> Collection of components for interaction

[![NPM](https://img.shields.io/npm/v/react-interaction.svg)](https://www.npmjs.com/package/react-interaction) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**📢️ Please check it. Currently, this module supports React 16.8 and later.**

<p align="center">
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760204/github/react-interaction-toast_wit5on.gif" width="40%" style="border: 1px solid #ffff00;"/>
&nbsp;&nbsp;&nbsp;
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760206/github/react-interaction-alert_ebv2kd.gif" width="40%"/>
</p>
<p align="center">
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760203/github/react-interaction-check_owjlpx.gif" width="40%"/>
&nbsp;&nbsp;&nbsp;
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760203/github/react-interaction-tooltip_qr7ezi.gif" width="40%"/>
</p>

## Components

- Toast popup
- Notice
- Check
- Tooltip

## Demo
[Example](https://almond-bongbong.github.io/react-interaction)

## Install

```bash
npm install --save react-interaction
```

## Toast

```
toast(message, options)
```

### options

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| time | number | `3000` | The millisecond time that the message is displayed. |
| className | string | | |
| style | CSSProperties | | |


## Notice

```
notice(message, options).then(() => console.log('closed'));
```

### options

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| dimmedClassName | string |  |  |
| dimmedStyle | CSSProperties |  | |
| contentClassName | string | | |
| contentStyle | CSSProperties | | |
| messageClassName | string | | |
| messageStyle | CSSProperties | | |
| okClassName | string | | |
| okStyle | CSSProperties | | |
| okText | string | `'OK'` | |


## Check

return `Promise<boolean>`

```
check(message, options).then(isConfirmed => console.log(isConfirmed));
```

### options

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| dimmedClassName | string |  |  |
| dimmedStyle | CSSProperties |  | |
| contentClassName | string | | |
| contentStyle | CSSProperties | | |
| messageClassName | string | | |
| messageStyle | CSSProperties | | |
| okClassName | string | | |
| okStyle | CSSProperties | | |
| okText | string | `'OK'` | |
| cancelClassName | string | | |
| cancelStyle | CSSProperties | | |
| cancelText | string | `'Cancel'` | |


## Tooltip

```
<Tooltip message="Tooltip message">tooltip</Tooltip>
```

### props

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| message | ReactNode |  |  |
| messageStyle | CSSProperties |  | |
| messageClassName | string | | |
| toggle | boolean | false | |


## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
