# react-interaction

> Collection of components for interaction

[![NPM](https://img.shields.io/npm/v/react-interaction.svg)](https://www.npmjs.com/package/react-interaction) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**📢️ Please check it. Currently, this module supports React 16.8 and later.**

<table>
<tr>
<td><img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760204/github/react-interaction-toast_wit5on.gif" /></td>
<td><img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760206/github/react-interaction-alert_ebv2kd.gif" /></td>
</tr>
<tr>
<td><img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760203/github/react-interaction-check_owjlpx.gif" /></td>
<td><img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583760203/github/react-interaction-tooltip_qr7ezi.gif" /></td>
</tr>
</table>

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
## Usage

```bash
import { toast, notice, check, Tooltip } from 'react-interaction';
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

Promise based notice component such as alert

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

Promise based check component such as confirm

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

The position of the tooltip is calculated automatically.

```
<Tooltip message="Tooltip message">tooltip</Tooltip>
```

### props

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| style | CSSProperties |  | |
| className | string | | |
| message | ReactNode |  |  |
| messageStyle | CSSProperties |  | |
| messageClassName | string | | |
| toggle | boolean | false | |


## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
