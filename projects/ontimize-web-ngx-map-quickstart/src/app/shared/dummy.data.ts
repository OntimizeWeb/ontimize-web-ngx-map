

export class DummyData {

  public static getDummyData(type: string): Array<Object> {
    if (type === 'pie') {
      return this.pieData();
    } else if (type === 'line') {
      return this.sinAndCos();
    }  else if (type === 'discreteBar') {
      return this.getDiscreteBarData();
    }
    return undefined;
  }

  public static pieData() {
    return [
      {
        x: 'Salary',
        y: 5
      },
      {
        x: 'Transfer',
        y: 2
      },
      {
        x: 'Automatic Cash',
        y: 9
      },
      {
        x: 'Bank fees',
        y: 7
      }
    ];
  }

  public static sinAndCos() {
    var sin = [], sin2 = [],
      cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / 10) });
      sin2.push({ x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
      cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
    }

    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      //values - represents the array of {x,y} data points
        key: 'Sine Wave', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }

  public static getDiscreteBarData(): Array<Object> {
    return [
      {
        key: 'Cumulative Return',
        values: [
          {
            'x': 'A',
            'y': -29.765957771107
          },
          {
            'x': 'B',
            'y': 0
          },
          {
            'x': 'C',
            'y': 32.807804682612
          },
          {
            'x': 'D',
            'y': 196.45946739256
          },
          {
            'x': 'E',
            'y': 0.19434030906893
          },
          {
            'x': 'F',
            'y': -98.079782601442
          },
          {
            'x': 'G',
            'y': -13.925743130903
          },
          {
            'x': 'H',
            'y': -5.1387322875705
          }
        ]
      }
    ];
  }

}
