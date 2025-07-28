var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  xAxis: {
    type: "value",
    scale: true,
    axisLabel: {
      formatter: "{value}"
    },
    axisPointer: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'dashed',
      },
    },
  },
  yAxis: {
    type: "value",
    scale: true,
    axisLabel: {
      formatter: "{value}"
    },
    axisPointer: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'dashed',
      },
    },
  },
  series: [{
    name: "Male",
    type: "line",
    data: [
      [174, 65],
      [175.3, 68.8],
      [171, 65],
      [180, 86],
      [174, 69],
      [180, 63],
    ],
    label: {
      show: false, // Скрываем label по умолчанию
      formatter: (params) => {
        return params.dataIndex.toString();
      },
      position: 'top',
      color: 'red',
    },
  }],
  tooltip: {
    trigger: "item",
    formatter: (data) => {
      return `
        <div style="padding:4px">Индекс: ${data.dataIndex}</div>
      `;
    },
  }
}

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

// Переменная для отслеживания текущего активного индекса
let currentHoveredIndex = -1;

// Обработчики событий для показа/скрытия label
myChart.on('mouseover', 'series', function (params) {
  if (currentHoveredIndex !== params.dataIndex) {
    currentHoveredIndex = params.dataIndex;
    
    // Обновляем конфигурацию с показом label только для наведенной точки
    const newOption = {
      series: [{
        label: {
          show: true,
          formatter: (labelParams) => {
            // Показываем label только для точки, на которую наведен курсор
            if (labelParams.dataIndex === currentHoveredIndex) {
              return currentHoveredIndex.toString();
            }
            return '';
          },
          position: 'top',
          color: 'red',
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'red',
          borderWidth: 1,
          borderRadius: 3,
          padding: [2, 4],
        }
      }]
    };
    
    myChart.setOption(newOption, false); // false для оптимизации
  }
});

myChart.on('mouseout', 'series', function (params) {
  currentHoveredIndex = -1;
  
  // Скрываем все label при уходе курсора
  const newOption = {
    series: [{
      label: {
        show: false,
      }
    }]
  };
  
  myChart.setOption(newOption, false); // false для оптимизации
});

window.addEventListener('resize', myChart.resize);