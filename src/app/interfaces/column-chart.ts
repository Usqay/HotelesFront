import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ApexAnnotations, ApexGrid, ApexNonAxisChartSeries, ApexTheme, ApexTitleSubtitle, ApexResponsive } from 'ng-apexcharts';

export interface ColumnChart {
    series ? : ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart ? : ApexChart;
    dataLabels ? : ApexDataLabels;
    plotOptions ? : ApexPlotOptions;
    yaxis ? : ApexYAxis;
    xaxis ? : ApexXAxis;
    labels ? : any;
    fill ? : ApexFill;
    tooltip ? : ApexTooltip;
    stroke ? : ApexStroke;
    legend ? : ApexLegend;
    annotations ? : ApexAnnotations;
    grid ? : ApexGrid;
    theme ? : ApexTheme;
    title ? : ApexTitleSubtitle;
    responsive ? : ApexResponsive[];
}
