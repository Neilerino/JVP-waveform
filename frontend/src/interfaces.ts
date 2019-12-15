// TODO: Fix the any type

export interface PlotParams {
    // config?: Plotly.Config;
    data: Plotly.Data[];
    layout: Partial<Plotly.Layout>;
    revision: any;
    // onClickAnnotation?: (event: Plotly.ClickAnnotationEvent) => void;
}
