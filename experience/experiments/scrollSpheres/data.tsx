import { Vector3 } from 'three'

function convertDegToRad(x: number) {
  return (x * Math.PI) / 180
}

function circlePosition(
  centerX: number,
  centerY: number,
  centerZ: number,
  radius: number,
  angle: number
) {
  var c = new Vector3(centerX, centerY, centerZ)
  var h = new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)

  return h.add(c)
}

function mix(x: number, y: number, interpolation: number) {
  return x * (1 - interpolation) + y * interpolation
}

/**
 * t: array of two vectors
 * progress: values between [0, 1]
 */
// vector values
function interpolateVectors(progress: number, vectors: Vector3[]) {
  var normalisedProgress = progress * (vectors.length - 1) // split between values

  var vector1 = vectors[Math.floor(normalisedProgress)] // first vector
  var vector2 = vectors[Math.floor(normalisedProgress) + 1] || vector1 // second vector or first
  var mixValue = normalisedProgress - Math.floor(normalisedProgress) // make sure value between 0, 1

  return new Vector3(
    mix(vector1.x, vector2.x, mixValue),
    mix(vector1.y, vector2.y, mixValue),
    mix(vector1.z, vector2.z, mixValue)
  )
}

// scalar values
function interpolateValues(progress: number, valuesArray: number[]) {
  var normalisedProgress = progress * (valuesArray.length - 1)

  var value1 = valuesArray[Math.floor(normalisedProgress)]
  var value2 = valuesArray[Math.floor(normalisedProgress) + 1]

  // null == value2 && (value2 = null)

  var mixValue = normalisedProgress - Math.floor(normalisedProgress)

  return mix(value1, value2, mixValue)
}

function linearInterpolate(
  property: string,
  interpolationArray: any[],
  isVector = false
) {
  var result: any[] = []
  var interpolate = isVector ? interpolateVectors : interpolateValues // choose scalar or vector function

  interpolationArray.forEach((data) => {
    if (data.interpolateToStep) {
      var steps = data.interpolateToStep - data.step

      for (var i = 0; i < steps; i++) {
        var interpolation = interpolate(
          i / steps, // progress
          [
            data[property], // starting value
            interpolationArray.find((property) => {
              // find next position
              // use matching property keyword to search
              return property.step === data.interpolateToStep
            })[property],
          ]
        )

        result.push(interpolation)
      }
    }

    // push value from data
    else {
      steps = data.toStep - data.step || 1

      for (var d = 0; d < steps; d++) {
        result.push(data[property])
      }
    }
  })

  return result
}

const heroSphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(0)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(135)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(225)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(315)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(4, 4, 0, 10, convertDegToRad(105)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(45)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(273.5)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(301.2)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(328.9)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(356.6)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(384.3)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(412)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
]

const heroGroups = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    { step: 0, toStep: 30, rotation: new Vector3(0, 0, 0) },
  ]),
}

const heroCamera = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 98, position: new Vector3(0, 0, 3) },
    { step: 98, toStep: 100, position: new Vector3(0, 0, 5) },
  ]),
}

const nexusSphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(0)),
      },
      {
        step: 10,
        toStep: 80,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(0)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(135)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(225)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(315)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(4, 4, 0, 10, convertDegToRad(105)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(45)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(273.5)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(301.2)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(328.9)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(356.6)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(384.3)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(412)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
]

const nexusGroups = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 10, position: new Vector3(0, 0, 0) },
    { step: 10, toStep: 100, position: new Vector3(0, 0, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    { step: 0, toStep: 100, rotation: new Vector3(0, 0, 0) },
  ]),
}

const nexusCamera = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 98, position: new Vector3(0, 0, 4) },
    { step: 98, toStep: 100, position: new Vector3(0, 0, 8) },
  ]),
}

const benefit0Sphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 10,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(0)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, -2, 4, convertDegToRad(135)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(135)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [{ at: 35, color: 'blue' }],
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(135)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(162.7)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 35, color: 'green' },
      { at: 46, color: 'blue' },
    ],
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(225)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(190.4)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 46, color: 'green' },
      { at: 57, color: 'blue' },
    ],
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 10,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(315)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, -1, -0.8, 3, convertDegToRad(270)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(218.1)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 57, color: 'green' },
      { at: 68, color: 'blue' },
    ],
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(4, 4, 0, 10, convertDegToRad(105)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(79.6)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 3, convertDegToRad(45)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(107.3)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 1 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 68, color: 'green' },
      { at: 79, color: 'blue' },
    ],
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(273.5)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 79, color: 'green' },
      { at: 90, color: 'blue' },
    ],
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(301.2)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [
      { at: 90, color: 'green' },
      { at: 100, color: 'blue' },
    ],
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(328.9)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
    colorSwitches: [{ at: 100, color: 'green' }],
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(356.6)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(384.3)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(412)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 20, scale: 0 },
        { step: 20, toStep: 100, scale: 1.4 },
      ],
      false
    ),
  },
]

const benefit0Groups = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 20, position: new Vector3(0, 0, 0) },
    { step: 20, toStep: 100, position: new Vector3(3, -4, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    { step: 0, toStep: 30, rotation: new Vector3(0, 0, 0) },
    { step: 30, interpolateToStep: 98, rotation: new Vector3(0, 0, 0) },
    {
      step: 98,
      toStep: 100,
      rotation: new Vector3(
        convertDegToRad(0),
        convertDegToRad(0),
        convertDegToRad(-180)
      ),
    },
  ]),
}

const benefit0Camera = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 20, position: new Vector3(0, 0, 8) },
    { step: 20, toStep: 100, position: new Vector3(0, 0, 10) },
  ]),
}

const benefit1Sphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(135)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(120)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 15, color: 'green' },
      { at: 35, color: 'blue' },
      { at: 90, color: 'green' },
    ],
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(162.7)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(180)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 35, color: 'green' },
      { at: 46, color: 'blue' },
    ],
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(190.4)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(240)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 46, color: 'green' },
      { at: 57, color: 'blue' },
    ],
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(218.1)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(300)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 57, color: 'green' },
      { at: 68, color: 'blue' },
    ],
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(79.6)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(0)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 68, color: 'green' },
      { at: 79, color: 'blue' },
    ],
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 30,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(107.3)),
      },
      {
        step: 30,
        toStep: 100,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(60)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 30, scale: 1.4 },
        { step: 30, toStep: 100, scale: 1 },
      ],
      false
    ),
    colorSwitches: [
      { at: 79, color: 'green' },
      { at: 90, color: 'blue' },
    ],
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(273.5)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(273.5)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(273.5)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(301.2)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(301.2)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(301.2)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(328.9)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(328.9)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(328.9)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
    colorSwitches: [{ at: 6, color: 'blue' }],
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(356.6)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(356.6)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(356.6)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
    colorSwitches: [
      { at: 6, color: 'green' },
      { at: 15, color: 'blue' },
    ],
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(384.3)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(384.3)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(384.3)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 10,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(412)),
      },
      {
        step: 10,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(412)),
      },
      {
        step: 20,
        toStep: 100,
        position: circlePosition(0, 0, 0, 20, convertDegToRad(412)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, toStep: 30, scale: 1.4 },
        { step: 30, interpolateToStep: 50, scale: 1.4 },
        { step: 50, toStep: 100, scale: 0 },
      ],
      false
    ),
  },
]

const benefit1Groups = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 30, position: new Vector3(3, -4, 0) },
    { step: 30, toStep: 100, position: new Vector3(0, 0.1, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    {
      step: 0,
      interpolateToStep: 30,
      rotation: new Vector3(
        convertDegToRad(0),
        convertDegToRad(0),
        convertDegToRad(-180)
      ),
    },
    {
      step: 30,
      interpolateToStep: 98,
      rotation: new Vector3(
        convertDegToRad(-40),
        convertDegToRad(20),
        convertDegToRad(-360)
      ),
    },
    {
      step: 98,
      toStep: 100,
      rotation: new Vector3(
        convertDegToRad(-40),
        convertDegToRad(20),
        convertDegToRad(-720)
      ),
    },
  ]),
  extraRotZ: convertDegToRad(-180),
}

const benefit1Camera = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 30, position: new Vector3(0, 0, 10) },
    { step: 30, toStep: 100, position: new Vector3(0, 0, 8) },
  ]),
}

const benefit2Sphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(120)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, -3, 2, convertDegToRad(10)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, -3, 2.5, convertDegToRad(10)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(180)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, 1, 1.7, convertDegToRad(100)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, 1, 2.2, convertDegToRad(100)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(240)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, 1, 1.9, convertDegToRad(170)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, 1, 2.4, convertDegToRad(170)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(300)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, -1, 1.5, convertDegToRad(250)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, -1, 2, convertDegToRad(250)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(0)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, -1, 4, convertDegToRad(-58)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, -1, 4.5, convertDegToRad(-58)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 20,
        position: circlePosition(0, 0, 0, 2, convertDegToRad(60)),
      },
      {
        step: 20,
        interpolateToStep: 98,
        position: circlePosition(0, 0, 0, 4.5, convertDegToRad(-20)),
      },
      {
        step: 98,
        toStep: 100,
        position: circlePosition(0, 0, 0, 5, convertDegToRad(-20)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 8, convertDegToRad(245.8)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 0 }],
      false
    ),
  },
]

const benefit2Groups = {
  positions: linearInterpolate('position', [
    { step: 0, interpolateToStep: 10, position: new Vector3(0, 0.1, 0) },
    { step: 10, toStep: 100, position: new Vector3(0, 0, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    {
      step: 0,
      interpolateToStep: 20,
      rotation: new Vector3(
        convertDegToRad(-40),
        convertDegToRad(20),
        convertDegToRad(-720)
      ),
    },
    {
      step: 20,
      toStep: 100,
      rotation: new Vector3(0, 0, convertDegToRad(-720)),
    },
  ]),
  extraRotZ: convertDegToRad(-180),
}

const benefit2Camera = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 8) },
  ]),
}

const benefit3Sphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -3, 2.5, convertDegToRad(10)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(90)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, 0, 0, convertDegToRad(90)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(90)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, 1, 2.2, convertDegToRad(100)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(60)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(60)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(60)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, 1, 2.4, convertDegToRad(170)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(135)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(135)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(135)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -1, 2, convertDegToRad(250)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(210)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(210)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(210)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -1, 4.5, convertDegToRad(-58)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(285)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, 0, 2.6, convertDegToRad(285)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(285)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, 0, 5, convertDegToRad(-20)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -1, 2.6, convertDegToRad(350)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -1, 2.6, convertDegToRad(350)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -1, 50, convertDegToRad(350)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(95)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -10, 4, convertDegToRad(95)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -10, 4, convertDegToRad(95)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(95)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(175)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -10, 7, convertDegToRad(175)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -10, 7, convertDegToRad(175)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(175)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(245)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -10, 7, convertDegToRad(245)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -10, 7, convertDegToRad(245)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(245)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(318)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -10, 8, convertDegToRad(318)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -10, 8, convertDegToRad(318)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(318)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(318)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -25, 6, convertDegToRad(318)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -25, 6, convertDegToRad(318)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(318)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(386)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -25, 8, convertDegToRad(386)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -25, 8, convertDegToRad(386)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(386)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        interpolateToStep: 65,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(386)),
      },
      {
        step: 65,
        toStep: 70,
        position: circlePosition(0, 0, -10, 8, convertDegToRad(386)),
      },
      {
        step: 70,
        interpolateToStep: 99,
        position: circlePosition(0, 0, -10, 8, convertDegToRad(386)),
      },
      {
        step: 99,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(386)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [
        { step: 0, interpolateToStep: 10, scale: 0 },
        { step: 10, toStep: 100, scale: 1 },
      ],
      false
    ),
  },
]

const benefit3Groups = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    {
      step: 0,
      toStep: 100,
      rotation: new Vector3(0, 0, convertDegToRad(-720)),
    },
  ]),
  extraRotZ: convertDegToRad(-180),
}

const benefit3Camera = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 8) },
  ]),
}

const personasSphere = [
  {
    index: 1,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(90)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 2,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(60)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 3,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(135)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 4,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(210)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 5,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, 0, 50, convertDegToRad(285)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 6,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -1, 50, convertDegToRad(350)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 7,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(95)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 8,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(175)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 9,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(245)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 10,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(318)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 11,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(318)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 12,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -25, 50, convertDegToRad(386)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
  {
    index: 13,
    positions: linearInterpolate('position', [
      {
        step: 0,
        toStep: 100,
        position: circlePosition(0, 0, -10, 50, convertDegToRad(386)),
      },
    ]),
    scales: linearInterpolate(
      'scale',
      [{ step: 0, toStep: 100, scale: 1 }],
      false
    ),
  },
]

const personasGroups = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 0) },
  ]),
  rotations: linearInterpolate('rotation', [
    {
      step: 0,
      toStep: 100,
      rotation: new Vector3(0, 0, convertDegToRad(-720)),
    },
  ]),
  extraRotZ: convertDegToRad(-180),
}

const personasCamera = {
  positions: linearInterpolate('position', [
    { step: 0, toStep: 100, position: new Vector3(0, 0, 8) },
  ]),
}

const data = [
  {
    name: 'hero',
    spheresData: heroSphere,
    groupsData: heroGroups,
    cameraData: heroCamera,
  },
  {
    name: 'nexus',
    spheresData: nexusSphere,
    groupsData: nexusGroups,
    cameraData: nexusCamera,
  },
  {
    name: 'benefits-0',
    spheresData: benefit0Sphere,
    groupsData: benefit0Groups,
    cameraData: benefit0Camera,
  },
  {
    name: 'benefits-1',
    spheresData: benefit1Sphere,
    groupsData: benefit1Groups,
    cameraData: benefit1Camera,
  },
  {
    name: 'benefits-2',
    spheresData: benefit2Sphere,
    groupsData: benefit2Groups,
    cameraData: benefit2Camera,
  },
  {
    name: 'benefits-3',
    spheresData: benefit3Sphere,
    groupsData: benefit3Groups,
    cameraData: benefit3Camera,
  },

  {
    name: 'personas',
    spheresData: personasSphere,
    groupsData: personasGroups,
    cameraData: personasCamera,
  },
]

export default data
