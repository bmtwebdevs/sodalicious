import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Admin from '../components/admin';

const mapStateToProps = (state) => {
    const props = {};
    return props;
}

const mapDispatchToProps = (dispatch) => {
    const actions = Object.assign({});
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

const adminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default adminContainer;