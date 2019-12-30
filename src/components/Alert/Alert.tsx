
const alertContainer = document.getElementById('alert_container');
if (!alertContainer) addRootElement(createElement('alert_container'));

const AlertStyle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0,0,0,0.4);

  & .content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    padding: 20px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
    text-align: center;
    transform: translate(-50%, -50%);
  }
  & .message {
    margin-bottom: 25px;
    color: #666;
    font-weight: 700;
    font-size: 16px;
  }
`;

const alert = message => new Promise((resolve) => {
  const container = document.getElementById('alert_container');
  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(container);
    resolve();
  };

  ReactDOM.render(
    <AlertStyle>
      <div className="content">
    <div className="message">
      {newlineText(message)}
      </div>
      <Button inline={false} onClick={handleClose} text="확인" />
    </div>
    </AlertStyle>,
  container,
);
});

export default alert;
