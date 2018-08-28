import { connect } from 'react-redux';
import Menu from '../components/Menu/Menu.js';

function mapStateToProps(state) {
    return {
        ...state.user
    };
}

const MenuContainer = connect(mapStateToProps, null)(Menu);

export default MenuContainer;