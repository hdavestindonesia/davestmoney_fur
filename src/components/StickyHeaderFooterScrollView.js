import React, { Component } from 'react';
import { Dimensions, View, ViewPropTypes, ScrollView } from 'react-native';

const { bool, func, number, string } = React.PropTypes;

const window = Dimensions.get('window');

const SCROLLVIEW_REF = 'ScrollView';

// Properties accepted by `stickyHeaderScrollView`.
const propTypes = {
  renderStickyHeader: func,
  renderStickyFooter: func,
  contentBackgroundColor: string,
  contentContainerStyle: func,
};

class StickyHeaderFooterScrollView extends Component {
  constructor(props) {
    super(props);
    this._bodyOffsetTop = 0;
    this._bodyHeight = 0;
    this._footerSpacerHeight = 0;
    this._bodyOffsetBottom = 0;
  }

  render() {
    const {
      renderStickyHeader,
      renderStickyFooter,
      renderScrollComponent,
      contentBackgroundColor,
      contentContainerStyle,
      children,
    } = this.props;

    const stickyHeader = this._renderStickyHeader(renderStickyHeader, {});

    const scrollElement = renderScrollComponent();

    const bodyComponent = this._wrapChildren(children, {});

    const footerSpacer = this._renderFooterSpacer({ contentBackgroundColor });

    const stickyFooter = this._renderStickyFooter(renderStickyFooter, {});

    return (
      <View>
        {React.cloneElement(
          scrollElement,
          {
            ref: SCROLLVIEW_REF,
            scrollEventThrottle: 16,
          },
          bodyComponent,
          footerSpacer
        )}
        {stickyHeader}
        {stickyFooter}
      </View>
    );
  }

  _renderStickyHeader(renderStickyHeader) {
    return (
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            flex: 1,
            width: Dimensions.get('window').width,
          },
        ]}
        onLayout={e => {
          const { nativeEvent: { layout: { height } } } = e;
          if (this._bodyOffsetTop !== height) {
            this._bodyComponent.setNativeProps({
              style: { marginTop: height },
            });
            this._bodyOffsetTop = height;
          }
        }}
      >
        {renderStickyHeader()}
      </View>
    );
  }

  _wrapChildren(children, { contentBackgroundColor, contentContainerStyle }) {
    const containerStyles = [{ backgroundColor: contentBackgroundColor }];

    if (contentContainerStyle) containerStyles.push(contentContainerStyle);

    return (
      <View
        style={containerStyles}
        ref={ref => (this._bodyComponent = ref)}
        onLayout={e => {
          const { nativeEvent: { layout: { height } } } = e;
          const footerSpacerHeight = Math.max(
            0,
            window.height - this._bodyOffsetBottom - this._bodyOffsetTop - height
          );
          if (this._footerSpacerHeight != footerSpacerHeight) {
            this._footerSpacerComponent.setNativeProps({
              style: { height: footerSpacerHeight },
            });
            this._footerSpacerHeight = footerSpacerHeight
          }
        }}
      >
        {children}
      </View>
    );
  }

  _renderFooterSpacer({ contentBackgroundColor }) {
    return (
      <View
        ref={ref => (this._footerSpacerComponent = ref)}
        style={{ backgroundColor: contentBackgroundColor }}
      />
    );
  }

  _renderStickyFooter(renderStickyFooter) {
    if (renderStickyFooter == null) return null;
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width,
          },
        ]}
        onLayout={e => {
          const { nativeEvent: { layout: { height } } } = e;
          if (this._bodyOffsetBottom !== height) {
            this._bodyComponent.setNativeProps({
              style: { marginBottom: height },
            });
            this._bodyOffsetBottom = height;
          }
        }}
      >
        {renderStickyFooter()}
      </View>
    );
  }

}

StickyHeaderFooterScrollView.propTypes = propTypes;

StickyHeaderFooterScrollView.defaultProps = {
  renderStickyHeader: null,
  renderStickyFooter: null,
  renderScrollComponent: props => <ScrollView {...props} />,
  contentContainerStyle: null,
  contentBackgroundColor: 'transparent',
};

module.exports = StickyHeaderFooterScrollView;