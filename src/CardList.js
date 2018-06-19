import React from 'react';
import {Animated, Dimensions, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {CardItem} from './CardItem';

export class CardList extends React.Component {

	static propTypes = {

		itemProps: PropTypes.shape({
			...CardItem.propTypes,
			renderContent: null,
			item: null,
		}),

		cards: PropTypes.arrayOf(CardItem.propTypes.item),

		selected: PropTypes.string,

		listStyle: PropTypes.any,

		duration: PropTypes.number,

		renderContent: PropTypes.func.isRequired,
	};

	static defaultProps = {
		duration: 600
	};

	_layouts = new Map();

	constructor(props) {
		super(props);

		this.state = {
			selected: new Map(),
			zoomedStyle: {},
			maxHeight: 400,
			zoomAnim: new Animated.Value(1),
			scrollEnabled: true
		}
	}

	_keyExtractor = (item, index) => item.id;

	_onPressItem = ({item, index}) => {

		if (!this._flatList) {
			return;
		}

		this.setState(state => {

			if (state.selected.get(item.id)) {
				return state;
			}

			let selected = new Map();
			selected.set(item.id, true);

			this._flatList.scrollToIndex({animated: true, index});

			let listWidth = this._layouts.get("FlatList").width;
			let listHeight = this._layouts.get("FlatList").height;

			let viewWidth = this._layouts.get(item.id).width;
			let viewHeight = this._layouts.get(item.id).height;

			let scale = listWidth / viewWidth;

			let maxHeight = listHeight / scale;
			// let maxHeight = 1000;
			// let maxHeight = this._layouts.get("FlatList").heigt - viewHeight;
			Animated.timing(this.state.zoomAnim, {
				toValue: scale,
				duration: this.props.duration
			}).start();

			return ({
				...state,
				selected: selected,
				zoomedStyle: {
					transform: [{scale: this.state.zoomAnim}, {translateY: viewWidth * 0.5 * (scale - 1)}]
				},
				maxHeight: maxHeight,
				scrollEnabled: false,
			});

		});

	};

	_onCloseItem = ({item, index}) => {
		this.setState(state => {

			Animated.timing(this.state.zoomAnim, {
				toValue: 1,
				duration: this.props.duration
			}).start();

			return ({
				...state,
				selected: new Map(),
				zoomedStyle: {
					transform: [{scale: this.state.zoomAnim}, {translateY: 0}]
				},
				scrollEnabled: true
			});

		});
	};

	_renderItem = ({item, index}) => {
		let {defaultTitle, defaultPicture} = this.props.itemProps;
		return <CardItem
			onLayout={e => this._layouts.set(item.id, e.nativeEvent.layout)}
			onPress={() => this._onPressItem({item, index})}
			onClose={() => this._onCloseItem({item, index})}
			maxHeight={this.state.maxHeight}
			selected={this.state.selected.get(item.id)}
			heightDuration={this.props.duration}
			textStyle={this.props.textStyle}
			{...this.props.itemProps}
			renderContent={this.props.renderContent}
			item={item}
		/>
	};

	render() {
		return (
			<Animated.View style={[{flex: 1}, this.state.zoomedStyle]}>
				<FlatList
					onLayout={e => this._layouts.set("FlatList", e.nativeEvent.layout)}
					ref={c => this._flatList = c}
					style={[{
						flex: 1,
						backgroundColor: 'white'
					}, this.props.listStyle]}
					data={this.props.cards}
					scrollEnabled={this.state.scrollEnabled}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
			</Animated.View>
		)
	}

}
