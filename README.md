# react-interaction

> Collection of components for interaction

[![NPM](https://img.shields.io/npm/v/react-interaction.svg)](https://www.npmjs.com/package/react-interaction) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Components

- Toast popup
- Notice
- Check
- Tooltip

## Install

```bash
npm install --save react-interaction
```

## [Live demo](https://almond-bongbong.github.io/react-interaction)

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

## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
