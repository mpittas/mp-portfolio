"use client"
import React from "react"
import ReactDOM from "react-dom"
import Matter, {Body} from "matter-js"

class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint

    var engine = Engine.create({
      // positionIterations: 20
    })

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        wireframes: false,
      },
    })

    var ground = Bodies.rectangle(
      window.innerWidth / 2 + 160,
      window.innerHeight + 80,
      window.innerWidth + 320,
      160,
      {render: {fillStyle: "#080808"}, isStatic: true}
    )
    var wallLeft = Bodies.rectangle(
      -80,
      window.innerHeight / 2,
      160,
      window.innerHeight,
      {isStatic: true}
    )
    var wallRight = Bodies.rectangle(
      window.innerWidth + 80,
      window.innerHeight / 2,
      160,
      1200,
      {isStatic: true}
    )
    var roof = Bodies.rectangle(
      window.innerWidth / 2 + 160,
      -80,
      window.innerWidth + 320,
      160,
      {isStatic: true}
    )

    var shape1 = Bodies.circle(10, 595, 20, {
      render: {fillStyle: "#7C3A2E"},
    })

    var shape2 = Bodies.rectangle(100, 595, 100, 100, {
      render: {fillStyle: "#C25822"},
    })
    var shape3 = Bodies.circle(200, 595, 40, {
      render: {fillStyle: "#7C3A2E"},
    })
    var shape4 = Bodies.rectangle(280, 500, 80, 80, {
      render: {fillStyle: "#ECD7C9"},
    })
    var shape5 = Bodies.rectangle(340, 595, 40, 40, {
      render: {fillStyle: "#7C3A2E"},
    })
    var shape6 = Bodies.circle(360, 595, 30, {
      render: {fillStyle: "#C25822"},
    })

    World.add(engine.world, [
      ground,
      wallLeft,
      wallRight,
      roof,
      shape1,
      shape2,
      shape3,
      shape4,
      shape5,
      shape6,
    ])
    // World.add(engine.world, [
    //   // walls
    //   //left
    //   Bodies.rectangle(0, 0, 20, 600, { isStatic: true }),
    //   //right
    //   Bodies.rectangle(400, 300, 20, 600, { isStatic: true }),
    //   //bottomm
    //   Bodies.rectangle(10, 600, 900, 10, { isStatic: true })
    // ]);

    // World.add(engine.world, [
    //   Bodies.circle(10, 595, 20, {
    //     restitution: 0,
    //     render: { fillStyle: "#7C3A2E" }
    //   }),
    //   Bodies.rectangle(100, 595, 100, 100, {
    //     restitution: 0,
    //     render: { fillStyle: "#C25822" }
    //   }),
    //   Bodies.circle(200, 595, 40, {
    //     restitution: 0,
    //     render: { fillStyle: "#7C3A2E" }
    //   }),
    //   Bodies.rectangle(280, 500, 80, 80, {
    //     restitution: 0,
    //     render: { fillStyle: "#ECD7C9" }
    //   }),
    //   Bodies.rectangle(340, 595, 40, 40, {
    //     restitution: 0,
    //     render: { fillStyle: "#7C3A2E" }
    //   }),
    //   Bodies.circle(360, 595, 30, {
    //     restitution: 0,
    //     render: { fillStyle: "#C25822" }
    //   })
    // ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      })

    World.add(engine.world, mouseConstraint)

    // Matter.Events.on(mouseConstraint, "mousedown", function (event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine)

    Render.run(render)
  }

  render() {
    return <div ref="scene" />
  }
}
export default Scene
