import React from "react";
import PropTypes from "prop-types";

class SplashScreen extends React.Component {

  static propTypes = {
    splash: PropTypes.object.isRequired,
    restart: PropTypes.func.isRequired,
  }

  render() {
    const splash = this.props.splash;
    return (
      <div className="splash-screen"
        style={{...splash.size,
          ...{display: (splash.show ? "" : "none"),
              backgroundColor: splash.color
          }
        }}
      >
        <h2>{splash.title}</h2>
        <button onClick={this.props.restart}>Restart</button>
      </div>
    );
  }
}
SplashScreen.LOST = {color: "#a229", title: "You have lost!"};
SplashScreen.WIN = {color: "#2a29", title: "You have won!"};

export default SplashScreen;
