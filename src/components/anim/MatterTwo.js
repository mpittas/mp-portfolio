"use client"
import React from "react"
import ReactDOM from "react-dom"
import Matter, {Body} from "matter-js"

class MatterTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.sceneRef = React.createRef()
  }

  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint

    const engine = Engine.create()

    const render = Render.create({
      element: this.sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        wireframes: false,
      },
    })

    // Define static elements and shapes
    const ground = Bodies.rectangle(
      window.innerWidth / 3,
      window.innerHeight + 80,
      window.innerWidth,
      160,
      {isStatic: true, render: {fillStyle: "red"}}
    )
    const wallLeft = Bodies.rectangle(
      0,
      window.innerHeight / 2,
      160,
      window.innerHeight,
      {isStatic: true}
    )
    const wallRight = Bodies.rectangle(
      window.innerWidth + 80,
      window.innerHeight / 2,
      160,
      window.innerHeight,
      {isStatic: true}
    )
    const roof = Bodies.rectangle(
      window.innerWidth / 2,
      -80,
      window.innerWidth,
      160,
      {isStatic: true}
    )

    // Define movable shapes
    const shapes = [
      Bodies.circle(10, 595, 20, {render: {fillStyle: "#7C3A2E"}}),
      Bodies.rectangle(100, 595, 100, 100, {render: {fillStyle: "#C25822"}}),
      Bodies.circle(200, 595, 40, {render: {fillStyle: "#7C3A2E"}}),
      Bodies.rectangle(280, 500, 80, 80, {render: {fillStyle: "#ECD7C9"}}),
      Bodies.rectangle(340, 595, 40, 40, {render: {fillStyle: "#7C3A2E"}}),
      Bodies.circle(360, 595, 30, {render: {fillStyle: "#C25822"}}),
    ]

    World.add(engine.world, [ground, wallLeft, wallRight, roof, ...shapes])

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {visible: false},
        },
      })

    World.add(engine.world, mouseConstraint)

    // Remove event listeners for mousewheel and DOMMouseScroll
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    )

    Engine.run(engine)
    Render.run(render)
  }

  render() {
    return <div ref={this.sceneRef} />
  }
}
export default MatterTwo
