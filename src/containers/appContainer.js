import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/app';

const mapStateToProps = (state) => {
    const props = {};
    return props;
}

const mapDispatchToProps = (dispatch) => {
    const actions = Object.assign({});
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

const appContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default appContainer;