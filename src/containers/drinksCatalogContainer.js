import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DrinksCatalog from '../components/drinksCatalog';
import * as drinksActions from '../actions/drinks';

const mapStateToProps = (state) => {
    const props = {
        drinks : state.drinks
    };
    return props;
}

const mapDispatchToProps = (dispatch) => {
    const actions = Object.assign({}, drinksActions);
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

const drinksContainer = connect(mapStateToProps, mapDispatchToProps)(DrinksCatalog);

export default drinksContainer;