export interface PlotParams {
    config?: Plotly.Config;
    data: Plotly.Data[];
    layout: Partial<Plotly.Layout>;
    onClickAnnotation?: (event: Plotly.ClickAnnotationEvent) => void;
}
