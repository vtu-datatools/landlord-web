import React from 'react'
import { PropTypes } from 'prop-types'
import Tab from './Tab'
import MenuButton from './MenuButton'
import './sidebar.scss'

const breakpoints = [
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-s'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-m'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-l'), 10),
]

const widths = [
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-s'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-m'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-l'), 10),
]


const TabType = PropTypes.shape({
  type: PropTypes.oneOf([Tab])
})


class Sidebar extends React.Component {

  componentDidMount(){

    if (this.props.rehomeControls){

      const { position } = this.props
      const selector = `.leaflet-${position}`
      const controls = document.querySelectorAll(selector)
      const topControl = document.querySelector(`.leaflet-top${selector}`)
      const bottomControl = document.querySelector(`.leaflet-bottom${selector}`)

      topControl.classList.add(`rehomed-top-${position}`)
      bottomControl.classList.add(`rehomed-bottom-${position}`)

      // Exception: Attribution control should not ever be rehomed (in my opinion):
      const attributionControl = document.querySelector(`${selector} .leaflet-control-attribution`)
      if (attributionControl){

        const backupOriginalHome = document.createElement('div')
        const leafletControlContainer = document.querySelector('.leaflet-control-container')
        backupOriginalHome.classList.add(`leaflet-${position}`)
        backupOriginalHome.classList.add('leaflet-bottom')
        backupOriginalHome.appendChild(attributionControl)
        leafletControlContainer.appendChild(backupOriginalHome)

      }

      controls.forEach(control => this.rootElement.appendChild(control))
      
    }

  }

  onClose = e => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.onClose){
      this.props.onClose(e)
    }
    if (this.props.panMapOnChange) {
      if (this.props.map){
        this.props.map.panBy([this.getOffset()/2,0], { duration: 0.5 })
      } else {
        console.error(`react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`)
      }
    }
  }

  onOpen = (e, tabid) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.onOpen){
      this.props.onOpen(tabid)
    }
    if (this.props.panMapOnChange && this.props.collapsed) {
      if (this.props.map){
        this.props.map.panBy([-this.getOffset()/2,0], { duration: 0.5 })
      } else {
        console.error(`react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`)
      }
    }
  }

  getOffset = () => {
    const windowSize = window.innerWidth
    var offset
    for (let i = 0; i < breakpoints.length - 1; i++){
      if (windowSize > breakpoints[i] && windowSize <= breakpoints[i + 1]) {
        offset = widths[i] / 2
      }
    }
    if (windowSize > breakpoints[breakpoints.length -1]){
      offset = widths[widths.length -1] / 2
    }
    return this.props.position === "left" ? offset : -offset

  }

  renderPanes(children) {
    return React.Children.map(children, p =>
      React.cloneElement(p, {
        onClose: this.onClose.bind(this),
        closeIcon: this.props.closeIcon,
        active: p.props.id === this.props.selected,
        position: this.props.position || 'left'
      })
    )
  }

  render() {
    const position = ` sidebar-${this.props.position || 'left'}`
    const collapsed = this.props.collapsed ? ' collapsed' : ''
    const tabs = React.Children.toArray(this.props.children)
    const bottomtabs = tabs.filter(t => t.props.anchor === 'bottom')
    const toptabs = tabs.filter(t => t.props.anchor !== 'bottom')

    return (
      <div
        id={this.props.id || 'leaflet-sidebar'}
        className={`sidebar leaflet-touch${position}${collapsed}`}
        ref={el => {
          this.rootElement = el
        }}
      >
        <div className='sidebar-tabs'>
          <ul role='tablist'>
            {toptabs.map(t =>
              <MenuButton
                key={t.props.id}
                id={t.props.id}
                icon={t.props.icon}
                disabled={t.props.disabled}
                selected={this.props.selected}
                collapsed={this.props.collapsed}
                onClose={this.onClose}
                onOpen={this.onOpen}
                map={this.props.map || null} />)}
          </ul>
          <ul role='tablist'>
            {bottomtabs.map(t =>
              <MenuButton
                key={t.props.id}
                id={t.props.id}
                icon={t.props.icon}
                disabled={t.props.disabled}
                selected={this.props.selected}
                collapsed={this.props.collapsed}
                onClose={this.onClose}
                onOpen={this.onOpen}
                map={this.props.map || null} />)}
          </ul>
        </div>
        <div className='sidebar-content'>
          {this.renderPanes(this.props.children)}
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  id: PropTypes.string,
  map: PropTypes.object,
  collapsed: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['left', 'right']),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  closeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  panMapOnChange: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(TabType), TabType])
}

export default Sidebar
