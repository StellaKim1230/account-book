import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootAction } from 'AppTypes'

import { Omit } from 'utility-types'

import Main from '../components/Main'
import { getMainStats as getMainStatsAction } from '../redux/actions/mainStats'

export type MainStats = Omit<MainStatsReducer, 'isLoading'>

interface Props {
  mainStats: MainStats,
  getMainStats: () => (dispatch: Dispatch) => void
}

class MainPage extends Component<Props> {
  componentDidMount() {
    this.props.getMainStats()
  }

  render() {
    return (
      <div className='MainPage'>
        <header>메인페이지</header>
        <Main />
      </div>
    )
  }
}

const mapStateToProps = ({ mainStats }: ReduxState) => ({
  mainStats,
})

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getMainStats: getMainStatsAction,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
