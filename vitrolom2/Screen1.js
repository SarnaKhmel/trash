// import { HelpIcon } from "./img/icons/help.png";
import "./styles/screen1.css";

function Screen1() {
  return (
    <div className="screen1">
      <div className="btn_block">
        <div className="slogan">
          Omnium malorum origo otium <br />
          бездіяльність – початок усіх бід
        </div>
        <div className="btns">
          <button>заповнити анкету</button>
          <button>отримати допомогу</button>
        </div>
        <div className="joinUs">
          Долучайся до нас!
          <div className="joinUsSymbol">{/* <HelpIcon /> */}</div>
        </div>
      </div>
      <div className="img_block"></div>
    </div>
  );
}

export default Screen1;
