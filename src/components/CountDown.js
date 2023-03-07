import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#000';
const DEFAULT_DIGIT_TXT_COLOR = '#000';
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];
const IS_CIRCLE = false;

class CountDown extends React.Component {
  static propTypes = {
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    timeToShow: PropTypes.array,
    size: PropTypes.number,
    until: PropTypes.number,
    onFinish: PropTypes.func,
    onPress: PropTypes.func,
    isCircle: PropTypes.bool,
  };

  state = {
    until: this.props.until,
  };

  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const {until} = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      if (this.onFinish) {
        this.onFinish();
      }
    }

    this.setState({until: until - 1});
  };

  renderDigit = (d) => {
    const {digitBgColor, digitTxtColor, size} = this.props;
    return (
      <View style={[
        styles.digitCont,
        {backgroundColor: digitBgColor},
        {width: size * 2.3, height: size * 2.6},
      ]}>
        <Text style={[
          styles.digitTxt,
          {fontSize: size},
          {color: digitTxtColor}
        ]}>
          {d}
        </Text>
      </View>
    );
  };

  renderDoubleDigits = (label, digits) => {
    const {timeTxtColor, size, isCircle} = this.props;

    if(isCircle){

      let lineColor = ''
      if(label == 'Jam'){
        lineColor = 'crimson'
      } else if(label == 'Menit'){
        lineColor = 'dodgerblue'
      } else if(label == 'Detik'){
        lineColor = 'gold'
      }

      return (
        <View key={label} style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'whitesmoke', width:80, height:80, margin:5, borderRadius: 40, borderWidth:5, borderColor:lineColor}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:lineColor, fontSize:20}}>{digits}</Text>
            <Text style={{fontSize:12}}>{label}</Text>
          </View>
        </View>
      )
    }else{
      return (
        <View key={label}>
          <View>
            <Text style={{color:'orange', fontSize:12}}>{digits} {label} </Text>
          </View>
        </View>
      )
    }
  }

  renderCountDown = () => {
    const {timeToShow, isCircle} = this.props;
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    return (
      <Component
        style={[styles.timeCont, isCircle ? {justifyContent: 'center', alignItems: 'center'} : null]}
        onPress={this.props.onPress}
      >
        {_.includes(timeToShow, 'D') ? this.renderDoubleDigits('Hari', newTime[0]) : null}
        {_.includes(timeToShow, 'H') ? this.renderDoubleDigits('Jam', newTime[1]) : null}
        {_.includes(timeToShow, 'M') ? this.renderDoubleDigits('Menit', newTime[2]) : null}
        {_.includes(timeToShow, 'S') ? this.renderDoubleDigits('Detik', newTime[3]) : null}
      </Component>
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.renderCountDown()}
      </View>
    );
  }
}

CountDown.defaultProps = {
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  until: 0,
  size: 15,
  isCircle: IS_CIRCLE,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row'
  },
  timeTxt: {
    color: 'white',
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {

    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

module.exports = CountDown;
