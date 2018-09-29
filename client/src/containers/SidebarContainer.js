import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

function mapStateToProps(state){
  debugger;
  return {
    users: state.users[0]!==undefined ? state.users[0].users : [],
  }
}

export const Sidebar = connect(mapStateToProps, {})(SidebarComponent)