// https://github.com/gkueny/react-native-pin-code
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {Dimensions, StyleSheet, TextInput, View, Text} from 'react-native';
const {height, width} = Dimensions.get('window');

class CodePin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      code: props.code === '----' ? new Array(props.code.length).fill('') : props.code.slice(),//,
      edit: 0
    };
    console.log('propscode: ' + props.code)

    this.textInputsRefs = [];
  }

  clean = () => {
    this.setState({
      code: new Array(this.props.number).fill(''),
      edit: 0
    });
    this.focus(0);
  };

  focus = id => {
    if (id != 4 && id < 4) {
      this.textInputsRefs[id].focus();
    };
  };

  isFocus = id => {
    let newCode = this.state.code.slice();

    for (let i = 0; i < newCode.length; i++)
      if (i >= id) newCode[i] = '';

    this.setState({
      code: newCode,
      edit: id
    });
  };

  handleEdit = (number, id) => {
    let newCode = this.state.code.slice();
    newCode[id] = number;

    this.props.success(newCode.join(''));

    this.focus(this.state.edit + 1);

    this.setState(prevState => {
      return {
        error: '',
        code: newCode,
        edit: prevState.edit + 1
      };
    });
  };

  render() {
    const {
      text,
      number,
      success,
      pinStyle,
      textStyle,
      errorStyle,
      containerStyle,
      containerPinStyle,
      ...props
    } = this.props;

    pins = [];

    for (let index = 0; index < number; index++) {
      const id = index;
      pins.push(
        <TextInput
          key={id}
          ref={ref => (this.textInputsRefs[id] = ref)}
          onChangeText={text => this.handleEdit(text, id)}
          onFocus={() => this.isFocus(id)}
          value={this.state.code[id] ? this.state.code[id].toString() : ''}
          style={[codePinStyles.pin, pinStyle]}
          returnKeyType={'done'}
          autoCapitalize={'sentences'}
          autoCorrect={false}
          {...props}
        />
      );
    }

    const error = this.state.error
      ? <Text style={[codePinStyles.error, errorStyle]}>
          {this.state.error}
        </Text>
      : null;

    return (
      <View style={[codePinStyles.container, containerStyle]}>
        <Text style={[codePinStyles.text, textStyle]}>
          {text}
        </Text>
        {error}
        <View style={[codePinStyles.containerPin, containerPinStyle]}>
          {pins}
        </View>
      </View>
    );
  }
}

CodePin.propTypes = {
  code: PropTypes.string.isRequired,
  success: PropTypes.func.isRequired,
  number: PropTypes.number,
  pinStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  containerPinStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

CodePin.defaultProps = {
  number: 4,
  text: 'Pin code',
  error: 'Bad pin code.',
  pinStyle: {},
  containerPinStyle: {},
  containerStyle: {},
  textStyle: {},
  errorStyle: {}
};

const codePinStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  containerPin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  pin: {
    textAlign: 'center',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.4
  },
  text: {
    textAlign: 'center',
    marginTop: 30
  },
  error: {
    textAlign: 'center',
    color: 'red',
    paddingTop: 10
  }
});

export default CodePin;